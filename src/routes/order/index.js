import React from 'react';
import { Redirect } from '@reach/router';

import lacroix from '../../utils/lacroix'

import IconInput from '../../components/iconInput'

const Card = ({ data, onClick }) => {
  return (
    <div className='item-card-container' onClick={onClick}>
      <div className='item-words'>
        <h3 className='item-title'>{data.name}</h3> 
        <p className='item-desc'>{data.description}</p>
      </div>
      <div className='item-image-container'>
        <img style={{height: '110px', width: '110px'}} src={data.img} />
      </div>
    </div>
  )
}


class Order extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
  }

  setCart = (data) => {
    const { address, setCart } = this.props
    if (!address) {
      this.setState({ error: true })
      return
    }

    setCart(data)
  }

  render() {
    const { cart, address, onTextChange } = this.props
    if (cart) {
      return <Redirect to="/checkout" />
    }
    return (
      <div className='order-parent'>
        <div className='order-header'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <h1>LaCroix Sparkling Water</h1>
          <p>LaCroix - sparkling water perfected.</p>
        </div>

        </div>

        <div className='order-body location'>
          <h2 className='order-drink-title' style={{maxWidth: '1024px'}}>Location</h2>
          <div className='items-content' style={{maxWidth: '1024px'}}>
            <IconInput
              iconType='location'
              type='text'
              placeholder='760 Orchard Rd, Davis, CA 95616'
              name='address'
              error={this.state.error && !address}
              errorMessage='Please enter your address!'
              style={{maxWidth: '500px'}}
              onChange={onTextChange}
              value={address}
            />
          </div>
        </div>

        <div className='order-body'>
          <h2 className='order-drink-title'>Items</h2>
          <div className='items-content'>
            {
              lacroix.map((l, index) => <Card key={l.id + index} data={l} onClick={() => this.setCart(l)} />)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Order;