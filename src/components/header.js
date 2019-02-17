import React from 'react'
import ReactDom from 'react-dom'

import { Location, Link } from '@reach/router';

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isModalOpen: false }
    this.dropdown = React.createRef();
    this.icon = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.outsideClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.outsideClick, false)
  }
  componentDidCatch() {
    document.removeEventListener('mousedown', this.outsideClick, false)
  }

  toggleModal = () => { this.setState((state) => ({ isModalOpen: !state.isModalOpen })) }
  closeModal = () => { this.setState({ isModalOpen: false }) }

  outsideClick = (e) => {
    if (
      this.state.isModalOpen &&
      !ReactDom.findDOMNode(this.dropdown.current).contains(e.target) &&
      !ReactDom.findDOMNode(this.icon.current).contains(e.target)) {
      this.closeModal()
    }
  }
  render() {
    const { isModalOpen } = this.state
    const { isLoggedIn, cart } = this.props
    return (
      <Location>
        {
          ({ location }) => (
            location.pathname !== '/onboarding' ?
              <div className='header'>
                <div className='header-inner'>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Link to="/">
                      <h1 className="header-title" style={{ fontSize: isLoggedIn ? '25px' : 'default'}}>
                        Full Stack Lacroix
                      </h1>
                    </Link>
                  </div>

                  {
                    isLoggedIn ?
                    <div className="header-container-one">
                        <svg ref={this.icon} onClick={this.toggleModal} style={{cursor: 'pointer'}} width="32" height="32" class="css-5rum3v eu6360k0"><g fill="none" fill-rule="evenodd"><circle fill="#ECEDEF" cx="16" cy="16" r="16"></circle><path d="M12.886 10.824A3.222 3.222 0 0 1 16.1 7.6a3.22 3.22 0 0 1 3.214 3.224v1.052A3.222 3.222 0 0 1 16.1 15.1a3.22 3.22 0 0 1-3.214-3.224v-1.052zm3.214 6.419c5.357 0 7.5 2.143 7.5 2.143V22.6h-15v-3.214s2.143-2.143 7.5-2.143z" fill="#C6CAD1"></path></g></svg>
                        {
                          <div ref={this.dropdown} className='dropdown' style={{ display: isModalOpen ? 'block' : 'none'}}>
                            <Link onClick={this.closeModal} to='/order' className='dropdown-content' >
                              Pending Orders
                            </Link>
                            <Link onClick={this.closeModal} to='/current' className='dropdown-content' >
                              Current Drinks
                            </Link>
                            <Link onClick={this.closeModal} to='/order' className='dropdown-content' >
                              Order
                            </Link>
                            <a className='dropdown-content' style={{borderBottom: '0px'}} onClick={this.props.logout}>
                              Logout
                            </a>
                          </div>
                        }
                      <Link to="/checkout">
                        { cart && <div class="cart-notif">1</div> }
                        <svg style={{cursor: 'pointer'}} width="22" height="22"  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18" role="img" viewBox="0 0 576 512"><path fill="#c5cad1" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>
                      </Link>
                    </div> :
                    <div style={{ display: 'flex', alignItems: 'center', width: '200px'}}>
                      <Link to='/onboarding' className='order-submit'>
                        Signup
                      </Link>
                      <Link to='/login' className='order-submit' style={{margin: '0px 5px', width: 'auto', color: '#ffa9ce', backgroundColor: 'transparent', border: '2px solid #ffa9ce', padding: '12px 20px', marginRight: 0}}>
                        Login
                      </Link>
                    </div>
                  }
                </div>
              </div> :
              null
          )
        }
      </Location>
    )
  }
}
