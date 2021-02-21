import React, { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || "",
        issues: [] 
    }
    const [userState, setuserState] = useState(initState);

    const signup = credentials => {
        axios.post('/auth/signup', credentials)
            .then (res => {
                const { user, token } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setuserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    const login = credentials => {
        axios.post('/auth/login', credentials)
        .then (res => {
            const { user, token } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            getUserIssues();
            setuserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
            .catch (err => console.dir(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setuserState({user: {}, token: ''})
    }

    const getUserIssues = () => {
        userAxios.get('/api/issue')
            .then(res => {
            setuserState(prevState => ({
            ...prevState,
            issues: res.data
        }))
    })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const createIssue = (newIssue) => {
        userAxios.post('/api/issue', newIssue)
        .then(res => {
            setuserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={ 
            { 
                ...userState, 
                signup, 
                login, 
                logout,
                createIssue
                } }>
            { props.children }
        </UserContext.Provider>
    )
}
