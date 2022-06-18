import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../features/rootReducer'

const ItemList = ({ item }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.root.cartItems)

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, quantity: 1 }))
  }

  const handleUpdateCart = (qty) => {
    dispatch(updateCart({ ...item, quantity: qty + 1}))
  }

  const handleButton = () => {
    if (cartItems === undefined || cartItems.length == 0) {
      handleAddToCart();
    }
    else {
      cartItems.map(cartItem => {
        if (item._id === cartItem._id) {
          const qty = cartItem.quantity
          handleUpdateCart(qty);
        }
        else {
          handleAddToCart();
        }
      })
    }
  }


  const { Meta } = Card;

  return (
    <div>
      <Card
        style={{
          maxWidth: 240,
          margin: "10px"
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 250 }} />}
      >
        <Meta title={item.name} />
        <div className='item-button'>
          <Button onClick={() => handleButton()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  )
}

export default ItemList