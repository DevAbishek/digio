import { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Row, Col } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../features/rootReducer';

const HomePage = () => {

    const dispatch = useDispatch();
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('drinks')
    const categories = [
        {
            name: 'drink',
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/4329/4329542.png'
        },
        {
            name: 'rice',
            imageUrl: 'https://cdn-icons.flaticon.com/png/512/1531/premium/1531334.png?token=exp=1655537840~hmac=129635315c351b9ceaeb730d0bc8cfc8'

        },
        {
            name: 'noodles',
            imageUrl: 'https://cdn-icons.flaticon.com/png/512/3041/premium/3041130.png?token=exp=1655537885~hmac=6d6346e7f346257ca80c5d0528e6f935'
        }
    ]
    const url = 'http://localhost:8080/';

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