import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';
import logo from '../assets/logo.svg';

export default function Login({history}) {

    const [username, setusername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/devs',{username});
        const {_id}= response.data;
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <img className="logo" src={logo} alt="logo" />
                <input placeholder="Enter your Github username"
                    value={username}
                    onChange={e => setusername(e.target.value)}
                />
                <button type="submit">Enter</button>
            </form>
        </div>
    );
}