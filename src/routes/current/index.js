import React from 'react';

import AWS from '../../utils/aws'
import lacroixMap from '../../utils/lacroixMap'

import { FadeIn } from '../../components/animate'

const Card = ({ lacroix, updateItem }) => (
  <div className='checkout-box' style={{ marginBottom: '10px'}}>
    <div className='item-words' >
      <h3 className='item-title'>{lacroix.name}</h3> 
      <p className='item-desc'>{lacroix.description}</p>
      {
        !lacroix.pickup ?
          <a onClick={updateItem} className='round-button' style={{ margin: 0, width: '110px', fontWeight: 'bold', padding: '7px 30px' }}>Pickup</a> :
          <FadeIn><p style={{marginTop: '20px'}}>Awesome! We're on our way to pick up your LaCroix.</p></FadeIn>
      }

    </div>
    <div className='item-image-container'>
      <img style={{height: '110px', width: '110px' }} src={lacroix.img} />
    </div>
  </div>
)

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: []
    }
  }

  componentDidMount() {
    this.fetchData()

    const interval = setInterval(this.fetchData, 2000);
    window.localStorage.setItem('current_drink_poll', interval)
  }

  componentDidCatch() {
    const interval = window.localStorage.getItem('current_drink_poll')
    clearInterval(interval)
  }
  componentWillUnmount() {
    const interval = window.localStorage.getItem('current_drink_pollsssss')
    clearInterval(interval)
  }


  fetchData = async () => {
    const ddb = new AWS.DynamoDB({});
    const params = {
      ExpressionAttributeValues: {
       ":email": {
         S: this.props.email 
        },
        ":pending": {
          S: 'pending'
        }
      },
      FilterExpression: "pending <> :pending AND email = :email",
      ProjectionExpression: "drink, pickup, id", 
      TableName: "remy_orders"
     };

    const d = await ddb.scan(params).promise()
    .then((d) => d.Items)
    .catch(console.log)

    if (d) {
      this.setState({ current: d.map(c => ({ aws_id: c.id.S, drink: c.drink.S, pickup: c.pickup ? c.pickup.S : null }) ) })
    }
  }

  renderLacroix = () => {
    const { current } = this.state

    if (current.length < 1) {
      return (
        <div className='checkout-box'>
          <div className='item-words'>
            <h3 className='item-title'>Uh Oh.</h3> 
            <p className='item-desc'>You don't have any LaCroix! Let's change that.</p>
          </div>
        </div>
      )
    }

    return current.map(c => {
      const s = lacroixMap[c.drink]
      s.pickup = c.pickup
      s.aws_id = c.aws_id
      return s
    }).map(c => <Card lacroix={c} updateItem={() => this.updateItem(c.aws_id)} />)
  }

  updateItem = async (id) => {
    const ddb = new AWS.DynamoDB({});

    const params = {
      TableName:"remy_orders",
      Key: {
        id: {
          S: id
        }
      },
      UpdateExpression: "set pickup = :pickup",
      ExpressionAttributeValues:{
          ":pickup": {
            S: 'true'
          },
      },
      ReturnValues:"UPDATED_NEW"
    };

    await ddb.updateItem(params).promise()
    .then(() => this.fetchData())
    .catch(console.log)

    const phone = window.localStorage.getItem('phone')
    if (phone) {
      await fetch(`${process.env.TWILLIO_SERVER}/pickup-pending`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: phone
        })
      })
      .catch(console.log)
    }
  }
   
  render() {
    return (
      <div className='order-parent'>
        <div className='order-header' style={{paddingBottom: '12px'}}>
          <div style={{ width: '70%', margin: 'auto'}}>
            <h1>Current LaCroix</h1>
            <p></p>
          </div>
        </div>

      <div className='checkout-section-parent'>
        <h4>Drink List</h4>
        { this.renderLacroix() }
      </div>

      </div>
    )
  }
}