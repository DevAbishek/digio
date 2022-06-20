import { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Row, Col } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../features/rootReducer';

const HomePage = () => {

    const url = 'http://localhost:8080/';
    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Drinks')
    const categories = [
        {
            name: 'Drinks',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/4329/4329542.png'
        },
        {
            name: 'Rice Bowls',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/641/641850.png'

        },
        {
            name: 'Noodles',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/1471/1471262.png'
        }
    ]

    useEffect(() => {
        const getAllItems = async () => {
            try {
                dispatch(showLoading())
                const { data } = await axios.get(`${url}api/items/get-item`)
                setItemsData(data)
                dispatch(hideLoading())
            } catch (error) {
                console.log(error)
            }
        }
        getAllItems()
    }, [dispatch])

    return (
        <>
            <DefaultLayout>
                <div className='d-flex'>
                    {categories.map(category => (
                        <div
                            key={category.name}
                            className={`category ${selectedCategory === category.name && 'category-active'}`}
                            onClick={() => setSelectedCategory(category.name)}
                        >
                            <h4>{category.name}</h4>
                            <img src={category.imageUrl} alt={category.name} height="40" width="60" />
                        </div>
                    ))}
                </div>
                <Row>
                    {
                        itemsData.filter(i => i.category === selectedCategory).map(item => (
                            <Col xs={24} lg={6} md={12} sm={12}>
                                <ItemList key={item.id} item={item} />
                            </Col>
                        ))
                    }
                </Row>
            </DefaultLayout>
        </>
    )
}

export default HomePage