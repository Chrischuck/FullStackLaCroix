import React from 'react'

class FAB extends React.PureComponent {
  constructor(props) {
    super(props)

    document.addEventListener('focusin', this.focusChange, false);
    document.addEventListener('focusout', this.focusChange, false);
  }


  componentWillUnmount() {
    document.removeEventListener('focusin', this.focusChange);
    document.removeEventListener('focusout', this.focusChange);
  }

  focusChange = () => {
    this.forceUpdate()
  }

  isInputFocus = () => {
    const t = document.activeElement.type;
    return (
      t === 'text' ||
      t === 'password' ||
      t === 'email'
    )
  }

  render() {
    const { onClick } = this.props
    return (
      <div className='fab' onClick={onClick} style={{ bottom: window.mobileType() === 'iOS' && this.isInputFocus() ? '5vh' : '2vh'}}>
        <svg height='15' aria-hidden="true" data-prefix="fas" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="rgb(66, 90, 112)" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
      </div>
    )
  }
}

export default FAB