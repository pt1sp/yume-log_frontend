import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('ユーザー名とパスワードを入力してください。');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${apiUrl}/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('user_id', response.data.user_id);
            navigate('/my-dreams');
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError('ユーザー名またはパスワードが間違っています!');
            } else {
                setError('サーバーエラーが発生しました。');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h1>ログイン</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'ログイン中...' : 'ログイン'}
            </button>
        </form>
    );
};

export default LoginForm;
