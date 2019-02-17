import React from 'react';

import SVG from '../../../svg/logo'

import { FadeIn } from '../../../components/animate'
import ProgressDots from '../../../components/progressDots'

export default ({ next, step }) => (
  <FadeIn className='flex-center onboarding-fade-in'>
    <div className='onboarding-step-parent'>
      {window.mobileType() !== 'Desktop' && <ProgressDots count={3} step={step} className='onboarding-progress' />}
      <div className='onboarding-svg-parent zero' style={{flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
        <SVG className='onboarding-svg' />
      </div>
      <div className='onboarding-content-parent'>
          {window.mobileType() === 'Desktop' && <ProgressDots count={3} step={step} className='onboarding-progress' />}
        <div className='onboarding-content'>
          <h1 style={{textAlign:'center', margin: '10px'}}>Forget Everything You Know About Recycling</h1>
          <p style={{textAlign:'center', marginTop: '10px', marginBottom: 0}}>Delivery and Recycling</p>
          <p style={{textAlign:'center', marginTop: 0}}v>powered by LaCroix</p>
          <a onClick={next} className='round-button'>Get Started</a>
        </div>
      </div>
    </div>
  </FadeIn>
)