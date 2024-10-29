import { useState } from 'react';
import axios from 'axios';

const DreamForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = '1';
    const apiUrl = process.env.REACT_APP_API_URL; // 環境変数からAPIのURLを取得

    try {
      await axios.post(`${apiUrl}/dreams`, { // APIのURLを使用
        user_id: userId,
        title,
        content,
        tag,
        location,
      });
      alert('夢が投稿されました~!');

      const response = await axios.get(`${apiUrl}/dreams/display`); // APIのURLを使用
      console.log(response.data);

      // フォームの入力値をリセット
      setTitle('');
      setContent('');
      setTag('');
      setLocation('');
    } catch (error) {
      console.error('エラーが発生しました', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dream-form">
      <input
        type="text"
        placeholder="タイトルを入力してください"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="夢の内容を入力してください"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="タグ"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <input
        type="text"
        placeholder="場所（任意）"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">投稿</button>
    </form>
  );
};

export default DreamForm;
