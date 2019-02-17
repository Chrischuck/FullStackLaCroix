import React from 'react'
import { navigate } from '@reach/router'
import Landingsvg from '../../svg/landing'

class Landing extends React.Component {
  onClick = () => {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      navigate('/order')
      return
    }
    localStorage.setItem('from_landing', true)
    navigate('/onboarding')
  }

  render() {
    const { isLoggedIn } = this.props
    
    return (
      <div className='landing-parent'>

        <div className='landing-content'>
          <h1 className="landing-h1" >Friends don't let friends waste. Recycle. </h1>
          <p className="landing-p">The leading service to deliver and recycle your LaCroix</p>
          <a onClick={this.onClick} style={{margin: '0'}} className='round-button landing-btn'>
            {
              isLoggedIn ? 'Order Now' : 'Get Started'
            }
          </a>
        </div>

        <div className='landing-svg'>
        <Landingsvg className='lsv' />
        </div>

      </div>
    )
  }
}

export default Landing;