import React, { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '',
        issues: [],
        errMsg: ''
    }
    const [userState, setuserState] = useState(initState);

    const handleAuthErr = errMsg => {
        setuserState(prevState => ({
            ...prevState,
            errMsg
        }))

    }

    const resetAuthErr = () => {
        setuserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

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
            .catch (err => handleAuthErr(err.response.data.errMsg))
    }

    const login = credentials => {
        axios.post('/auth/login', credentials)
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
            .catch (err => handleAuthErr(err.response.data.errMsg))
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
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const createIssue = (newIssue) => {
        userAxios.post('/api/issue', newIssue)
        .then(res => {
            setuserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const getUsername = (userID, setUsername, returnObj = true) => {
        setUsername({ name: 'Loading...' });
        userAxios.get(`/api/user/${userID}`)
            .then(res => {
                returnObj ? setUsername({ name: res.data.username }) : setUsername(res.data.username);
            })
            .catch(err => {
                handleAuthErr(err);
            });
    }

    const getOneIssue = (issueID, setIssue, setByName, setInputs, setComments) => {
        userAxios.get(`/api/issue/${issueID}`)
        .then(res => {
            setIssue(res.data);
            setInputs({ issue: res.data.issue });
            userAxios.get(`/api/user/${res.data.user}`)
            .then(byRes => {
                setByName(`${byRes.data.username}`);
                userAxios.get(`/api/comment`)
                .then (res => {
                    let issueComments = res.data.filter(item => item.issue === issueID);
                    

                    issueComments.forEach(comment => {
                        userAxios.get(`/api/user/${comment.user}`)
                        .then( res => {
                            comment.userData = res.data;
                        })
                        .catch(commentErr => handleAuthErr(commentErr));
                    });

                    setComments(issueComments);
                })
            })
            .catch(byErr => {
                handleAuthErr(byErr);
            });
        })
        .catch(err => {
            handleAuthErr(err)
        })
    }

    const postComment = (issueID, comment, setComments) => {
        userAxios.post(`/api/comment`, {
            issue: issueID,
            comment: comment
        })
        .then(res => {
            setComments(prevState => ([...prevState, res.data]))
        })
        .catch(err => {
            handleAuthErr(err);
        })
    }

    const deleteIssue = (issueID, history) => {
        userAxios.delete(`/api/issue/${issueID}`)
        .then(res => {
            history.push('/issues');
        })
        .catch(err => {
            handleAuthErr(err);
        })
    }

    const updateIssue = (issueID, updateObject, setIssue) => {
        userAxios.put(`/api/issue/${issueID}`, updateObject)
        .then(res => {
            if(setIssue) {
                setIssue(res.data);
            }
        })
        .catch(err => {
            handleAuthErr(err);
        })
    }

    const getProfilePicture = (userID, setFunc) => {
        userAxios.get(`/api/user/${userID}`)
        .then(res => {
            setFunc(res.data)
        })
        .catch(err => {
            handleAuthErr(err);
        })
    }

    const submitUserChanges = (userID, obj) => {
        userAxios.put(`/api/user/${userID}`, obj)
        .then(res => {
        })
        .catch(err => {
            handleAuthErr(err);
        })
    }
    
    const updateComment = (commentID, obj, setFunc) => {
        userAxios.put(`/api/comment/${commentID}`, obj)
        .then(res => {
            setFunc(res.data);
        })
        .catch(err => {
            handleAuthErr(err);
        })
    }

    const deleteComment = (commentID, setComments) => {
        userAxios.delete(`/api/comment/${commentID}`)
        .then(res => {
            setComments(prevState => prevState.filter(item => item._id !== res.data._id))
        })
        .catch(err => {
            handleAuthErr(err)
        })
    }

    return (
        <UserContext.Provider value={ 
            { 
                ...userState, 
                signup, 
                login, 
                logout,
                createIssue,
                resetAuthErr,
                getUsername,
                getUserIssues,
                getOneIssue,
                deleteIssue,
                updateIssue,
                postComment,
                submitUserChanges,
                updateComment,
                deleteComment
                } }>
            { props.children }
        </UserContext.Provider>
    )
}
