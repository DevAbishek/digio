import { useEffect } from 'react'
import { Button, Form, Select, Table, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

    const url = 'https://digio-pos.herokuapp.com/';
    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        try {
            const res = await axios.post(`${url}api/users/login`, value)
            console.log(res)
            message.success("User Logged In Successfully")
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate('/')
        } catch (error) {
            console.log(error)
            message.error('Something Went Wrong')
        }

    }

    // loggedIn user
    useEffect(() => {
        const validuser = localStorage.getItem('auth')
        console.log(validuser)
        if (validuser) {
            navigate('/')
        }
    }, [navigate])

    return (
        <>
            <div className="register">
                <div className='register-form'>
                    <h1 style={{ fontFamily: 'cursive' }}>Digio</h1>
                    <h3 style={{ fontFamily: 'fantasy' }}>Welcome Back!</h3>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name="userId" label="User ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type="password" />
                        </Form.Item>
                        <div className="d-flex justify-content-between">
                            <p>
                                Don't have an account?
                                <Link to="/register"> Signup Here!</Link>
                            </p>
                            <Button type="primary" htmlType='submit'>Log In</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default LoginPage