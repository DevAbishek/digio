import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Table } from "antd";
import { updateCart, deleteCart } from '../features/rootReducer'

const CartPage = () => {

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

    return (
        <>
            <DefaultLayout>
                <h1>Cart Page</h1>
                <Table columns={columns} dataSource={cartItems} bordered />
            </DefaultLayout>
        </>
    )
}

export default CartPage