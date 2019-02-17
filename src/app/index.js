import React, { Fragment } from 'react';
import { Router, navigate } from '@reach/router';
import Loadable from 'react-loadable';

import './index.css'

import Loading from '../components/loading'

const Landing = Loadable({
  loader: () => import('../routes/landing'),
  loading: Loading,
});

const Onboarding = Loadable({
  loader: () => import('../routes/onboarding'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('../routes/login'),
  loading: Loading,
});

const Order = Loadable({
  loader: () => import('../routes/order'),
  loading: Loading,
});

const Checkout = Loadable({
  loader: () => import('../routes/checkout'),
  loading: Loading,
});

const Current = Loadable({
  loader: () => import('../routes/current'),
  loading: Loading,
});

const Pending = Loadable({
  loader: () => import('../routes/pending'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import('../routes/notFound'),
  loading: Loading,
});

import Header from '../components/header'

export default class extends React.Component {
  constructor(props) {
    super(props)
    const cart = window.localStorage.getItem('cart')
    const email = window.localStorage.getItem('email')
    this.state = {
      cart: cart ? JSON.parse(cart) : null,
      address: '',
      isLoggedIn: !!window.localStorage.getItem('email'),
      email: email || null
    }
  }

  setCart = (item) => {
    if (item) {
      window.localStorage.setItem('cart', JSON.stringify(item))
    } else {
      window.localStorage.setItem('cart', '')
    }
    this.setState({ cart: item })
  }

  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  login = (email) => {
    this.setState({ isLoggedIn: true, email })
  }

  logout = () => {
    window.localStorage.setItem('email', '')
    this.setState({ isLoggedIn: false })
    navigate('/login')
  }

  render() {
    const { cart, address, isLoggedIn, email } = this.state
    return (
      <Fragment>
        <Header isLoggedIn={isLoggedIn} cart={cart} logout={this.logout} />
        <Router style={{display: 'flex', flex: 1}}>
          <Landing path='/' isLoggedIn={isLoggedIn} />
          <Onboarding path="/onboarding" login={this.login} />
          <Order path="/order" setCart={this.setCart} cart={cart} onTextChange={this.onTextChange} address={address} />
          <Checkout path="/checkout"  setCart={this.setCart} cart={cart} address={address} />
          <Pending path="/pending" />
          <Login path="/login" login={this.login} />
          <Current path="/current" email={email} />
          <NotFound default />
        </Router>
      </Fragment>
    )
  }
}
