import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute, keepLoginRoute } from '../utils/APIRoutes';
const Register = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const keepLogin = async () => {
            let user_info = JSON.parse(localStorage.getItem('user'));
            const username = user_info.username;
            const password = user_info.password;
            const {data} = await axios.post(keepLoginRoute, {
                username, password
            })
            if (data.success === true) {
                navigate('/')
            }
        }
        keepLogin()
    },[])
    const [inputValue, setInputValue] = useState({
        username: "",
        email:"",
        password: "",
        confirmPassword: ""
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidate()) {
            const {username, email, password, confirmPassword} = inputValue
            const {data} = await axios.post(registerRoute, {
                username, email, password
            })
            if (data.success === true) {
                toast.success(data.message, toastOptions)
                localStorage.setItem('user', JSON.stringify(data.data))
                navigate('/')
            } else {
                toast.error(data.message, toastOptions)
            }
        }
    }
    const handleChange = (event) => {
        setInputValue({...inputValue, [event.target.name]:event.target.value})
    }
    const handleValidate = () => {
        const {username, email, password, confirmPassword} = inputValue
        if (username.length < 3) {
            toast.warn("Username should be greater or equal 3 characters", toastOptions)
            return false
        }
        else if (!email) {
            toast.warn("Email is required", toastOptions)
            return false
        }
        else if (password.length < 8) {
            toast.warn("Password should be greater or equal 8 characters", toastOptions)
            return false
        }
        else if (password !== confirmPassword) {
            toast.warn("Password does not match with confirm password", toastOptions)
            return false
        } else {
            return true
        }
    }
    const toastOptions = {
        position: 'top-center',
        draggable: true,
        theme: 'dark',
        autoClose: 3000,
    }
    return (
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <h1>Secret Chat</h1>
                </div>
                <input type="text" name="username" placeholder="Username" onChange={(event) => handleChange(event)} value={inputValue.username} />
                <input type="email" name="email" placeholder="Email" onChange={(event) => handleChange(event)} value={inputValue.email} />
                <input type="password" name="password" placeholder="Password" onChange={(event) => handleChange(event)} value={inputValue.password} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(event) => handleChange(event)} value={inputValue.confirmPassword} />
                <button type="submit">REGISTER</button>
                <span>
                    Already have an account ?  <Link to="/login"> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </FormContainer>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: #131324;
    .brand {
        color:white;
    }
    form {
        display: flex;
        flex-direction: column;
        gap:2rem;
        background-color: #00000076;
        padding: 3rem 5rem;
        border-radius: 2rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1 rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                font-weight: bold;
                text-decoration: none;
            }
        }
    }



`;

export default Register
