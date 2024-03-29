import { useEffect } from 'react'
import { Button, Form, Select, Table, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {

    const url = 'https://digio.onrender.com/';
    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        try {
            const res = await axios.post(`${url}api/users/register`, value)
            message.success("User Added Successfully")
            navigate('/login')
        } catch (error) {
            console.log(error)
            message.error('Something Went Wrong')
        }

    }

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
                    <h1 style={{fontFamily: 'cursive'}}>Digio</h1>
                    <h3 style={{fontFamily: 'fantasy'}}>Get! Set! Go!</h3>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="userId" label="User ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type="password" />
                        </Form.Item>
                        <div className="d-flex justify-content-between">
                            <p>
                                Have an account?
                                <Link to="/login"> Login Here!</Link>
                            </p>
                            <Button type="primary" htmlType='submit'>Sign Up</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RegisterPage