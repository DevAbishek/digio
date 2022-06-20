import { useState, useEffect } from 'react'
import DefaultLayout from "../components/DefaultLayout";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../features/rootReducer';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Select, Table, Input, message } from "antd";



const ItemPage = () => {

    const url = 'https://digio-pos.herokuapp.com/';
    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([]);
    const [popupModal, setPopupModal] = useState(false)
    const [editItem, setEditItem] = useState(null)

    const getAllItems = async () => {
        try {
            dispatch(showLoading())
            const { data } = await axios.get(`${url}api/items/get-item`)
            await setItemsData(data)
            dispatch(hideLoading())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllItems()
    }, [dispatch])

    const handleDelete = async(record) => {
        try {
            console.log(record._id)
            await axios.delete(`http://localhost:8080/api/items/delete-item/${record._id}`)
            message.success("Item deleted successfully")
            getAllItems();
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
        }
    }

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Image', dataIndex: 'image', render: (image, record) => <img src={image} alt={record.name} height="60" width="60" /> },
        { title: 'Price', dataIndex: 'price' },
        {
            title: 'Actions', dataIndex: '_id', render: (id, record) => (
                <div>
                    <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleDelete(record)
                        }}
                    />
                    <EditOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setEditItem(record);
                            setPopupModal(true);
                        }}
                    />
                </div>)
        }
    ]

    const handleSubmit = async (value) => {
        if (editItem === null) {
            try {
                const res = await axios.post(`http://localhost:8080/api/items/add-item`, value)
                message.success("Item added successfully")
                getAllItems();
                setPopupModal(false)
            } catch (error) {
                console.log(error)
                message.error('Something went wrong')
            }
        }
        else {
            try {
                console.log({ ...value, itemId: editItem._id })
                await axios.put(`http://localhost:8080/api/items/edit-item`, { ...value, itemId: editItem._id })
                message.success("Item updated successfully")
                getAllItems();
                setPopupModal(false)
            } catch (error) {
                console.log(error)
                message.error('Something went wrong')
            }
        }
    }

    return (
        <div>
            <DefaultLayout>
                <div className='d-flex justify-content-between'>
                    <h1>Item List</h1>
                    <Button type='primary' onClick={() => setPopupModal(true)}>Add Item</Button>
                </div>
                <Table columns={columns} dataSource={itemsData} bordered />
                {
                    popupModal && (
                        <Modal
                            title={editItem !== null ? "Edit Item" : "Add New Item"}
                            visible={popupModal}
                            onCancel={() => {
                                setEditItem(null);
                                setPopupModal(false);
                            }}
                            footer={false} >
                            <Form layout='vertical' onFinish={handleSubmit} initialValues={editItem}>
                                <Form.Item name="name" label="Name">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="price" label="Price">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="image" label="Image URL">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="category" label="Category">
                                    <Select>
                                        <Select.Option value="Drinks">Drinks</Select.Option>
                                        <Select.Option value="Rice Bowls">Rice Bowls</Select.Option>
                                        <Select.Option value="Noodles">Noodles</Select.Option>
                                    </Select>
                                </Form.Item>
                                <div className="d-flex justify-content-end">
                                    <Button type="primary" htmlType='submit'>Save</Button>
                                </div>
                            </Form>
                        </Modal>
                    )
                }
            </DefaultLayout>
        </div>
    )
}

export default ItemPage