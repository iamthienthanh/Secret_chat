import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { keepLoginRoute } from '../utils/APIRoutes';
import axios from 'axios';
const Chat = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const keepLogin = async () => {
            let user_info = JSON.parse(localStorage.getItem('user'));
            const username = user_info.username;
            const password = user_info.password;
            const {data} = await axios.post(keepLoginRoute, {
                username, password
            })
            if (data.success === false) {
                navigate('/login')
            }
        }
        keepLogin()
    },[])
    return (
    <div>Chat</div>
  )
}

export default Chat