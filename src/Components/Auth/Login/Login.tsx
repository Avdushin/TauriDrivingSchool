import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await invoke('login', { email, password });
            if (result) {
                alert('Login successful');
            } else {
                alert('Login failed: Incorrect email or password');
            }
        } catch (error) {
            alert(`Login error: ${error}`);
        }
    };

    return (
        <>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </>
    );
};
