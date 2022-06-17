import { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Row, Col } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
import { hideLoading } from '../features/rootReducer';

const HomePage = () => {

    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([]);
    const url = 'http://localhost:8080/';

    useEffect(() => {
        const getAllItems = async () => {
            try {
                const { data } = await axios.get(`${url}api/items/get-item`)
                setItemsData(data)
                dispatch(hideLoading)
            } catch (error) {
                console.log(error)
            }
        }
        getAllItems()
    }, [])

    return (
        <>
            <DefaultLayout>
                <Row>
                    {
                        itemsData.map(item => (
                            <Col xs={24} lg={6} md={12} sm={12}>
                                <ItemList item={item} />
                            </Col>
                        ))
                    }
                </Row>
            </DefaultLayout>
        </>
    )
}

export default HomePage