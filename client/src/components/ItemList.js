import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/rootReducer'

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddToCart =() =>{
    dispatch(addToCart({ ...item, quantity: 1}))
  }


  const { Meta } = Card;

  return (
    <div>
      <Card
          style={{
          maxWidth: 240,
          margin: "10px"
        }}
        cover={<img alt={item.name} src={item.image} style={{height: 250}} />}
      >
        <Meta title={item.name}/>
        <div className='item-button'>
          <Button onClick={() => handleAddToCart()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  )
}

export default ItemList