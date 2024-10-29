import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const MyDreams: React.FC = () => {
    const [dreams, setDreams] = useState<any[]>([]);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchMyDreams = async () => {
            try {
                const response = await axios.get(`${apiUrl}/dreams/my`, {
                    params: { user_id: userId },
                });
                setDreams(response.data);
            } catch (error) {
                console.error('エラーが発生しました', error);
            }
        };
        if (userId) {
            fetchMyDreams();
        }
    }, [userId]);

    return (
        <div>
            <h1>自分の投稿した夢</h1>
            {dreams.length > 0 ? (
                dreams.map((dream) => (
                    <div key={dream.id} className="dream-card">
                        <h2>{dream.title}</h2>
                        <p>{dream.content}</p>
                    </div>
                ))
            ) : (
                <p>まだ夢を投稿していません。</p>
            )}
        </div>
    );
};

export default MyDreams;
