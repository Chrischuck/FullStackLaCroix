import React from 'react';
import { Redirect, navigate } from '@reach/router';
import Loadable from 'react-loadable';

import Loading from '../../components/loading'

import Zero from './steps/zero'

const One = Loadable({
  loader: () => import('./steps/one'),
  loading: Loading,
});

const Two = Loadable({
  loader: () => import('./steps/two'),
  loading: Loading,
});

import FAB from '../../components/fab'

class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    const fromLanding = !!localStorage.getItem('from_landing')
    localStorage.setItem('from_landing', '')
    
    this.state = {
      step: fromLanding ? 1 : 0,
      name: '',
      email: '',
      password: '',
      error: false,
      fromLanding,
    }
  }

  componentDidMount() {
    One.preload()
    Two.preload()
  }

  next = async () => {
    const { step, name, email, password  } = this.state
    if (step === 1 && !name) {
      this.setState({ error: true })
      return
    }
    if (step === 2 && (!email || !password)) {
      this.setState({ error: true })
      return
    }

    if (step === 2) {
      localStorage.setItem('email', email)
      localStorage.setItem('name', name)
      this.props.login(email)
    }
    this.setState((prevState) => ({ step: prevState.step + 1, error: false }))
  }

  onChange = (e) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  renderStep = () => {
    const { error, email, password, step, fromLanding } = this.state
    switch (step) {
      case 0:
        return <Zero next={this.next} step={step} />
      case 1:
        return <One fromLanding={fromLanding} onKeyPress={this.onKeyPress} onChange={this.onChange} step={step} error={error} />
      case 2:
        return <Two onKeyPress={this.onKeyPress} email={email} password={password} username={this.state.name} step={step} error={error} onChange={this.onChange} />
      case 3:
        return <Redirect to="/order" />
      default:
        return null
    }
  }

  render() {
    if (window.localStorage.getItem('email')) {
      navigate('/')
    }
    return (
      <div className='onboarding-parent'>

        { this.renderStep() }
        {
          this.state.step !== 0 && <FAB onClick={this.next} />
        }
      </div>
    )
  }
}

export default Onboarding;