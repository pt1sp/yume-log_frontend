import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dream } from '../types';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const RecommendedDreams: React.FC = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dreams/recommended`);
        setDreams(response.data);
      } catch (error) {
        console.error('Error fetching recommended dreams:', error);
      }
    };

    fetchDreams();
  }, []);

  return (
    <div className="recommended-dreams">
      <button onClick={() => navigate('/register')}>ユーザー新規登録</button>
    </div>
  );
};

export default RecommendedDreams;
