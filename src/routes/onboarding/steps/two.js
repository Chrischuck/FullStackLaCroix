import React from 'react';

import { FadeInFromLeft, FadeIn } from '../../../components/animate'

import ProgressDots from '../../../components/progressDots'
import SVG from '../../../svg/finish'

import IconInput from '../../../components/iconInput'

export default ({ username, onChange, email, password, error, step, onKeyPress }) => (
  window.mobileType() === 'Desktop' ?
  (
    <div className='flex-center onboarding-fade-in'>
      <div className='onboarding-step-parent'>
        <FadeIn className='onboarding-svg-parent'>
          <SVG className='onboarding-svg' />
        </FadeIn>
        <div className='onboarding-content-parent'>
          {window.mobileType() === 'Desktop' && <ProgressDots count={3} step={step} className='onboarding-progress' />}
          <FadeIn className='onboarding-content'>
            <h1 style={{textAlign:'center', margin: '10px'}}>Almost there, {username}!</h1>
            <p style={{textAlign:'center', marginTop: '0', marginBottom: '15px'}}>
              Get ready to craft your perfect LaCroix
            </p>
            <IconInput
              name='email'
              onChange={onChange}
              iconType='email'
              type='email'
              onKeyPress={onKeyPress}
              placeholder='Chris@fullstacklacroix.com'
              error={error && !email}
              errorMessage='Please enter an email.'
              value={email}
            />
            <IconInput
              name='password'
              onChange={onChange}
              iconType='password'
              type='password'
              onKeyPress={onKeyPress}
              placeholder='Password'
              error={error && !password}
              errorMessage='Please enter a password.'
              value={password}
            />
            {window.mobileType() !== 'Desktop' && <ProgressDots count={3} step={step} className='onboarding-progress' />}

          </FadeIn>
        </div>
      </div>
    </div> 
  ) :
  (
    <div className='flex-center onboarding-fade-in'>
      <ProgressDots count={3} step={step} className='onboarding-progress' />
      <FadeInFromLeft className='onboarding-step-parent'>
        <div className='onboarding-svg-parent'>
          <SVG className='onboarding-svg' />
        </div>
        <div className='onboarding-content-parent'>
          <div className='onboarding-content'>
            <h1 style={{textAlign:'center', margin: '10px'}}>Almost there, {username}!</h1>
            <p style={{textAlign:'center', marginTop: '0', marginBottom: '15px'}}>
              Get ready to craft your perfect LaCroix
            </p>
            <IconInput
              name='email'
              onChange={onChange}
              iconType='email'
              type='email'
              placeholder='Chris@fullstacklacroix.com'
              error={error && !email}
              errorMessage='Please enter an email.'
            />
            <IconInput
              name='password'
              onChange={onChange}
              iconType='password'
              type='password'
              placeholder='Password'
              error={error && !password}
              errorMessage='Please enter a password.'
            />
          </div>
        </div>
      </FadeInFromLeft>
    </div> 
  )
)