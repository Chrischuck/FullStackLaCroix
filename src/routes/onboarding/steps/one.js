import React from 'react';

import SVG from '../../../svg/friends'

import { FadeInFromLeft, FadeIn } from '../../../components/animate'

import ProgressDots from '../../../components/progressDots'
import IconInput from '../../../components/iconInput'

export default ({ onChange, error, step, onKeyPress, name, fromLanding }) => {
  return window.mobileType() === 'Desktop' || fromLanding ?
  (
    <div className='flex-center onboarding-fade-in'>
      <div className='onboarding-step-parent'>
        <FadeIn className='onboarding-svg-parent'>
          <SVG className='onboarding-svg' />
        </FadeIn>
        <div className='onboarding-content-parent'>
          <ProgressDots count={3} step={step} className='onboarding-progress' />
          <FadeIn className='onboarding-content'>
            <h1 style={{textAlign:'center', margin: '10px'}}>Welcome to the party!</h1>
            <p style={{textAlign:'center', marginTop: '0', marginBottom: '15px'}}>
              I'm Full Stack LaCroix, what's your name?
            </p>
            <IconInput
              iconType='user'
              type='text'
              placeholder='Chris'
              onChange={onChange}
              onKeyPress={onKeyPress}
              name={'name'}
              error={error}
              errorMessage='Please enter your name!'
            />
          </FadeIn>
        </div>
      </div>
    </div>
  ) :
  (
    <div className='flex-center onboarding-fade-in'>
      <ProgressDots count={3} step={step} className='onboarding-progress' />
      <FadeInFromLeft className='onboarding-step-parent'>
        <div className='onboarding-svg-parent' style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <SVG className='onboarding-svg' />
        </div>
        <div className='onboarding-content-parent'>
          <div className='onboarding-content'>
            <h1 style={{textAlign:'center', margin: '10px'}}>Welcome to the party!</h1>
            <p style={{textAlign:'center', marginTop: '0', marginBottom: '15px'}}>
              What's your name?
            </p>
            <IconInput
              iconType='user'
              type='text'
              placeholder='Chris'
              onChange={onChange}
              name={'name'}
              error={error}
              errorMessage='Please enter your name!'
            />
          </div>
        </div>
      </FadeInFromLeft>
    </div>
  )
}