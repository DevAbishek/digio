import { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import DefaultLayout from '../components/DefaultLayout'
import { Button, Form, Modal, Select, Table, Input, message } from "antd";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../features/rootReducer';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import "../styles/InvoiceStyles.css"


const BillsPage = () => {

    const url = 'https://digio-pos.herokuapp.com/';
    const dispatch = useDispatch();
    const componentRef = useRef()

    const [billsData, setBillsData] = useState([]);
    const [popupModal, setPopupModal] = useState(false)
    const [selectedBill, setSelectedBill] = useState(null)

    const getAllBills = async () => {
        try {
            dispatch(showLoading())
            const { data } = await axios.get(`${url}api/bills/get-bill`)
            await setBillsData(data)
            dispatch(hideLoading())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBills()
    }, [])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const columns = [
        { title: 'ID', dataIndex: '_id' },
        { title: 'Name', dataIndex: 'customerName' },
        { title: 'Contact No.', dataIndex: 'customerContact' },
        { title: 'Sub Total', dataIndex: 'subTotalAmount' },
        { title: 'Tax', dataIndex: 'tax' },
        { title: 'Total', dataIndex: 'totalAmount' },
        {
            title: 'Actions', dataIndex: '_id', render: (id, record) => (
                <div>
                    <EyeOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setSelectedBill(record);
                            setPopupModal(true);
                        }}
                    />
                </div>)
        }
    ]

    return (
        <DefaultLayout>
            <div className='d-flex justify-content-between'>
                <h1>Invoice List</h1>
            </div>
            <Table columns={columns} dataSource={billsData} bordered />
            {
                popupModal && (
                    <Modal
                        title="Invoice Details"
                        visible={popupModal}
                        onCancel={() => {
                            setPopupModal(false);
                        }}
                        footer={false}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <div className="ticket" ref={componentRef}>
                            <h1>Digio</h1>
                            <p className="centered">
                                22/1 Connaught Place
                                <br />
                                New Delhi
                                <br />
                                <br />
                                ID: {selectedBill._id}
                            </p>
                            <p className='centered'>
                                Customer Name: {selectedBill.customerName}
                                <br />
                                Phone No: {selectedBill.customerContact}
                                <br />
                                Date: {selectedBill.date.toString().substring(0, 10)}
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="quantity">Item</th>
                                        <th className="description">Qty</th>
                                        <th className="price">$$</th>
                                        <th className='total'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedBill.cartItems.map((item) => (
                                        <>
                                            <tr>
                                                <td className="quantity">{item.name}</td>
                                                <td className="description">{item.quantity}</td>
                                                <td className="price">{item.price}</td>
                                                <td className='total'>{item.quantity * item.price}</td>
                                            </tr>
                                        </>
                                    ))}
                                    <tr>
                                        <td />
                                        <td />
                                        <td className='price'>Tax</td>
                                        <td>${selectedBill.tax}</td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td />
                                        <td className='price'>Total</td>
                                        <td>${selectedBill.totalAmount}</td>
                                    </tr>
                                    <tr></tr>
                                </tbody>
                            </table>
                            <br />
                            <p className="centered">Thanks for your purchase!
                                <br />18% GST applied on total amount.</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "end"}}>
                            <Button type='primary' onClick={handlePrint}>Print</Button>
                        </div>
                    </Modal>
                )
            }
        </DefaultLayout>
    )
}

export default BillsPage