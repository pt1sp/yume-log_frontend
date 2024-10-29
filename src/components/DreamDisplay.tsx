import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Dream型を定義
interface Dream {
  id: number;
  content: string;
  tag: string;
  location: string;
  title: string;
  view_count: number;
  reactions: {
    ok: number;
    happy: number;
    scary: number;
    sad: number;
    lonely: number;
    fun: number;
    surprised: number;
    dislike: number;
  };
}

const DreamDisplay: React.FC = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  
  useEffect(() => {
    const fetchDreams = async () => {
      const apiUrl = process.env.REACT_APP_API_URL; // 環境変数からAPIのURLを取得
      try {
        const response = await axios.get(`${apiUrl}/dreams/display`); // APIのURLを使用
        console.log(response.data);
        const formattedDreams = response.data.map((dream: any) => ({
          ...dream,
          reactions: {
            ok: parseInt(dream.ok_count, 10) || 0,
            happy: parseInt(dream.happy_count, 10) || 0,
            scary: parseInt(dream.scary_count, 10) || 0,
            sad: parseInt(dream.sad_count, 10) || 0,
            lonely: parseInt(dream.lonely_count, 10) || 0,
            fun: parseInt(dream.fun_count, 10) || 0,
            surprised: parseInt(dream.surprised_count, 10) || 0,
            dislike: parseInt(dream.dislike_count, 10) || 0,
          },
        }));
        setDreams(formattedDreams);
      } catch (error) {
        console.error('エラーが発生しました', error);
      }
    };

    fetchDreams();
  }, []);

  return (
    <div>
      <h1>他の人の夢を見る</h1>
      {dreams.length > 0 ? (
        dreams.map(dream => (
          <div key={dream.id} className="dream-card">
            <Link to={`/dream/${dream.id}`}>
              <h2 className="dream-title">{dream.title}</h2>
              <p>👍<span>{dream.reactions.ok} </span> 
              😊<span>{dream.reactions.happy} </span> 
              😱<span>{dream.reactions.scary} </span> 
              😢<span>{dream.reactions.sad} </span> 
              😔<span>{dream.reactions.lonely} </span> 
              😄<span>{dream.reactions.fun} </span> 
              😲<span>{dream.reactions.surprised} </span> 
              👎<span>{dream.reactions.dislike} </span> </p>
            </Link>
          </div>
        ))
      ) : (
        <p>夢がありません</p>
      )}
    </div>
  );
};

export default DreamDisplay;
