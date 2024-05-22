import React, { useEffect, useState } from 'react';
import User from './User';
import './styles.css';

export default function GitHubProfileFinder() {
    const [username, setUsername] = useState('cnourrcier');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    async function fetchGitHubUserData() {
        try {
            setLoading(true);
            const res = await fetch(`https://api.github.com/users/${username}`);
            const data = await res.json();
            if (data) setUserData(data);
            setLoading(false);
            setUsername('');
        } catch (err) {
            console.log(err);
            setErrorMsg(err.message);
            setLoading(false);
        }
    }

    function handleSubmit() {
        fetchGitHubUserData(username);
    }

    useEffect(() => {
        fetchGitHubUserData();
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (errorMsg) {
        return <div>Error occured: {errorMsg}</div>
    }

    return (
        <div className='github-profile-container'>
            <div className='input-wrapper'>
                <input
                    type='text'
                    name='search-by-username'
                    placeholder='Search GitHub Username...'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {
                userData !== null ? <User user={userData} /> : null
            }
        </div>
    )
}
