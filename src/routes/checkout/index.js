import React, {Fragment} from 'react';
import { navigate } from '@reach/router';

import AWS from '../../utils/aws'

import IconInput from '../../components/iconInput'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      address: props.address,
      name: window.localStorage.getItem('name'),
      time: '',
      phone: '',
      loading: false,
      error: false,
      complete: false
    }
  }

  onChange = (e) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = async () => {
    const { address, name, time, phone } = this.state

    if (!address || !name || !time) {
      this.setState({ error: true })
      return
    }

    this.setState({ loading: true })

    const ddb = new AWS.DynamoDB({});

    const { cart } = this.props
    const email = window.localStorage.getItem('email')
    if (!email) {
      return
    }
    const id = email + ':' + Date.now()

    const params = {
      Item: {
       "id": {
         S: id
        }, 
        email: {
          S: email
        },
        "drink": {
          S: cart.id
        },
        address: {
          S: address
        },
        name: {
          S: name
        },
        time: {
          S: time
        },
        status: {
          S: 'pending'
        }
      }, 
      TableName: "remy_orders"
     };

     await ddb.putItem(params).promise()
      .catch(console.log)

    window.localStorage.setItem('pending_order_id', id)
    window.localStorage.setItem('pending_order_flavor', cart.name)
    this.props.setCart(null)
    this.setState({ loading: false, complete: true })

    if (phone) {
      const number = phone.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
      if (number) {
        const formattedNumber = '1' + number[2] + number[3] + number[4]
        window.localStorage.setItem('phone', formattedNumber)

        if (formattedNumber) {
          await fetch(`${process.env.TWILLIO_SERVER}/confirm`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              number: formattedNumber
            })
          })
          .catch(console.log)
        }
      }
    }
  }

  render() {
    const { address, name, time, phone, error, loading, complete } = this.state
    const { cart } = this.props

    if (complete) {
      navigate('/pending')
      return <div></div>
    }
    
    return (
      <div className='order-parent'>
        <div className='order-header' style={{paddingBottom: '12px'}}>
          <div style={{ width: '70%', margin: 'auto'}}>
            <h1>Checkout</h1>
            <p>Confirm your order.</p>
          </div>
        </div>

        <div className='checkout-section-parent'>
          <h4>Delivery Details</h4>
          <div className='checkout-box'>
            <IconInput
              iconType='location'
              type='text'
              placeholder='760 Orchard Rd, Davis, CA 95616'
              name='address'
              label='Address'
              errorMessage='Please enter your address!'
              style={{flex: 1, margin: '5px', minWidth: '250px'}}
              value={address}
              onChange={this.onChange}
              error={error && !address}
            />
            <IconInput
              iconType='time'
              type='text'
              placeholder='10:00 AM'
              name='time'
              label='Time'
              errorMessage='Please enter a delivery time!'
              style={{flex: 1, margin: '5px', minWidth: '250px'}}
              value={time}
              onChange={this.onChange}
              error={error && !time}
            />
            <IconInput
              iconType='user'
              type='text'
              placeholder='Chris'
              name='name'
              label='Name'
              errorMessage='Please enter your name!'
              style={{flex: 1, margin: '5px', minWidth: '250px'}}
              value={name}
              onChange={this.onChange}
              error={error && !name}
            />
            <IconInput
              iconType='phone'
              type='tel'
              placeholder='650-332-9928'
              name='phone'
              label='Phone Number'
              errorMessage='Please enter a phone number!'
              style={{flex: 1, margin: '5px', minWidth: '250px'}}
              value={phone}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className='checkout-section-parent' style={{marginBottom: '10px'}}>
          <h4>Order Details</h4>
          <div className='checkout-box'>
            {
              cart ?
              <Fragment>
                <div className='item-words' style={{display:'block'}}>
                  <h3 className='item-title'>{cart.name}</h3> 
                  <p className='item-desc'>{cart.description}</p>
                </div>
                <div className='item-image-container'>
                  <img style={{height: '110px', width: '110px'}} src={cart.img} />
                </div>
              </Fragment> :
              <div className='item-words' style={{display:'block'}}>
                <h3 className='item-title'>Uh Oh.</h3> 
                <p className='item-desc'>You don't have any LaCroix!</p>
              </div>
            }
          </div>
        </div>
        <div className='button-container'>
          <a onClick={this.onSubmit} type="button" className='order-submit' disabled={!cart || loading}>
            {
              loading ?
              <span>Loading...</span> :
              <span>Schedule Delivery</span>
            }
          </a>
        </div>
        <div style={{height:'20px', color: 'transparent', marginTop: '10px'}}>
        stupid ios...
        </div>
      </div>
    )
  }
}