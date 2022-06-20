import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import axios from 'axios';
import { hideLoading, showLoading } from '../features/rootReducer';
import { Table } from "antd";



const CustomerPage = () => {

  const url = 'https://digio-pos.herokuapp.com/';
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);


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

  const columns = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Name', dataIndex: 'customerName' },
    { title: 'Contact No.', dataIndex: 'customerContact' },
  ]

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h1>Customers</h1>
      </div>
      <Table columns={columns} dataSource={billsData} pagination={false} bordered />
    </DefaultLayout>

  )
}

export default CustomerPage