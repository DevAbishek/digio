import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import DefaultLayout from "../components/DefaultLayout";
import { updateCart, deleteCart } from '../features/rootReducer';
import { Button, Form, Modal, Select, Table, Input, message } from "antd";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const CartPage = () => {

    const [subTotal, setSubTotal] = useState(0)
    const [taxed, setTaxed] = useState(0)
    const [total, setTotal] = useState(0)
    const [billPopup, setBillPopup] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.root.cartItems)

    const handleIncrement = (record) => {
        dispatch(updateCart({ ...record, quantity: record.quantity + 1 }))
    }

    const handleDecrement = (record) => {
        if (record.quantity !== 1) {
            dispatch(updateCart({ ...record, quantity: record.quantity - 1 }))
        }
    }

    const handleDelete = (record) => {
        dispatch(deleteCart(record))
    }

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Image', dataIndex: 'image', render: (image, record) => <img src={image} alt={record.name} height="60" width="60" /> },
        { title: 'Price', dataIndex: 'price' },
        {
            title: 'Quantity', dataIndex: '_id', render: (id, record) => (
                <div>
                    <PlusCircleOutlined className="mx-2" style={{ cursor: "pointer" }} onClick={() => handleIncrement(record)} />
                    <b>{record.quantity}</b>
                    <MinusCircleOutlined className="mx-2" style={{ cursor: "pointer" }} onClick={() => handleDecrement(record)} />
                </div>)
        },
        { title: 'Actions', dataIndex: '_id', render: (id, record) => <DeleteOutlined style={{ cursor: "pointer" }} onClick={() => handleDelete(record)} /> }
    ]

    useEffect(() => {
        let temp = 0;
        cartItems.forEach(item => {
            temp = temp + (item.price * item.quantity)
        });
        setSubTotal(temp)
    }, [cartItems])

    useEffect(() => {
        setTaxed(Number(((subTotal / 100) * 18).toFixed(2)))
    }, [subTotal])

    useEffect(() => {
        setTotal(Number(subTotal + taxed))
    }, [taxed])

    const handleSubmit = async (value) => {
        console.log(value)
        try {
            const newBill = {
                ...value,
                customerContact: Number(value.customerContact),
                subTotalAmount: subTotal,
                totalAmount: total,
                tax: taxed,
                userId: JSON.parse(localStorage.getItem('auth'))._id,
                cartItems: cartItems
            }
            // console.log(newObject)
            await axios.post('https://digio.onrender.com/api/bills/add-bill', newBill)
            message.success("Bill Generated")
            // navigate('/bills')

        } catch (error) {
            message.error('Something went wrong.')
        }
    }



    return (
        <>
            <DefaultLayout>
                <h1>Cart Page</h1>
                <Table columns={columns} dataSource={cartItems} bordered />
                <div className="d-flex flex-column align-items-end">
                    <hr />
                    <h3>SUB TOTAL: $ <b>{subTotal}</b></h3>
                    <Button type="primary" onClick={() => setBillPopup(true)}>Create Invoice</Button>
                </div>
                <Modal title="Create Invoice" onCancel={() => setBillPopup(false)} footer={false} visible={billPopup}>
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <Form.Item name="customerName" label="Customer Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="customerContact" label="Contact Number">
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="paymentMode" label="Payment Method">
                            <Select>
                                <Select.Option value="cash">Cash</Select.Option>
                                <Select.Option value="card">Card</Select.Option>
                                <Select.Option value="upi">UPI</Select.Option>
                            </Select>
                        </Form.Item>
                        <div className="bill-item">
                            <h5>Sub Total: <b>{subTotal}</b></h5>
                            <h4>Tax: <b>{taxed}</b></h4>
                            <h3>Grand Total: <b>{total}</b></h3>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button type="primary" htmlType='submit'>Generate Bill</Button>
                        </div>
                    </Form>
                </Modal>
            </DefaultLayout>
        </>
    )
}

export default CartPage