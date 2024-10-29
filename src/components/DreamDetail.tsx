import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DreamDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [dream, setDream] = useState<any>(null);

    useEffect(() => {
        const fetchDreamDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/dreams/${id}`);
                setDream(response.data);
            } catch (error) {
                console.error('夢の詳細を取得できませんでした:', error);
                // ハロー
            }
        };

        fetchDreamDetail();
    }, [id]);

    const handleReaction = async (reactionType: string) => {
        await axios.post(`http://localhost:4000/api/dreams/${id}/react`, { reaction: reactionType });
        
        setDream((prevDream: any) => ({
            ...prevDream,
            reactions: {
                ...prevDream.reactions,
                [reactionType]: (prevDream.reactions[reactionType] || 0) + 1,
            },
        }));
    };

    return (
        <div>
            {dream ? (
                <>
                    <h1>{dream.title}</h1>
                    <p>{dream.content}</p>
                    <p>
                        <button onClick={() => handleReaction('ok')}>👍 {dream.reactions?.ok || 0}</button>
                        <button onClick={() => handleReaction('happy')}>😊 {dream.reactions?.happy || 0}</button>
                        <button onClick={() => handleReaction('scary')}>😱 {dream.reactions?.scary || 0}</button>
                        <button onClick={() => handleReaction('sad')}>😢 {dream.reactions?.sad || 0}</button>
                        <button onClick={() => handleReaction('lonely')}>😔 {dream.reactions?.lonely || 0}</button>
                        <button onClick={() => handleReaction('fun')}>😄 {dream.reactions?.fun || 0}</button>
                        <button onClick={() => handleReaction('surprised')}>😲 {dream.reactions?.surprised || 0}</button>
                        <button onClick={() => handleReaction('dislike')}>👎 {dream.reactions?.dislike || 0}</button>
                    </p>
                </>
            ) : (
                <p>夢の詳細を読み込んでいます...</p>
            )}
        </div>
    );
};

export default DreamDetail;
