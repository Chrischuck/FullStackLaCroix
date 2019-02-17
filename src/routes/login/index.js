import React from 'react';
import { navigate } from '@reach/router';

import SVG from '../../svg/welcome'

import { FadeIn } from '../../components/animate'

import IconInput from '../../components/iconInput'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: window.localStorage.getItem('name'),
      email: '',
      password: '',
      error: null
    }
  }


  onChange = (e) => { this.setState({ [e.target.name]: e.target.value}) }

  submit = () => {
    const { email, password } = this.state
    if (!email, !password) {
      this.setState({ error: true })
      return
    }
    window.localStorage.setItem('email', email)
    this.props.login(email)
    navigate('/')
  }

  render() {
    const { error, email, password, name } = this.state

    return window.mobileType() === 'Desktop' ?
    (
      <div className='flex-center onboarding-fade-in'>
        <div className='onboarding-step-parent'>
          <FadeIn className='onboarding-svg-parent' style={{background: 'linear-gradient(0, #654ea342, #eaafc885)'}}>
            <SVG className='onboarding-svg' />
          </FadeIn>
          <div className='onboarding-content-parent'>
            <FadeIn className='onboarding-content'>
              <h1 style={{textAlign:'center', margin: '10px'}}>Welcome back, {name ? name : 'friend'}!</h1>
              <IconInput
                name='email'
                onChange={this.onChange}
                iconType='email'
                type='email'
                placeholder='Chris@fullstacklacroix.com'
                error={error && !email}
                errorMessage='Please enter an email.'
              />
              <IconInput
                name='password'
                onChange={this.onChange}
                iconType='password'
                type='password'
                placeholder='Password'
                error={error && !password}
                errorMessage='Please enter a password.'
              />
              <a onClick={this.submit} className='round-button' style={{width: '270px'}}>Login</a>
            </FadeIn>
          </div>
        </div>
      </div>
    ) :
    (
      <div className=' onboarding-fade-in' style={{justifyContent: 'baseline', alignItems: 'center', paddingTop: '10%', background: 'linear-gradient(0, #654ea342, #eaafc885)'}}>
        <FadeIn className='onboarding-step-parent'>
          <div className='onboarding-svg-parent' style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <SVG className='onboarding-svg' />
          </div>
          <div className='onboarding-content-parent'>
            <div className='onboarding-content'>
              <h1 style={{textAlign:'center', margin: '10px'}}>Welcome back, friend!</h1>
              <IconInput
                name='email'
                onChange={this.onChange}
                iconType='email'
                type='email'
                placeholder='Chris@fullstacklacroix.com'
                error={error && !email}
                errorMessage='Please enter an email.'
              />
              <IconInput
                name='password'
                onChange={this.onChange}
                iconType='password'
                type='password'
                placeholder='Password'
                error={error && !password}
                errorMessage='Please enter a password.'
              />
              <a onClick={this.submit} className='round-button' style={{width: '180px'}}>Login</a>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}