import React from 'react'

class ProgressDots extends React.Component {
  renderDots = () => {
    const { count, step } = this.props

    const dots = []
    for (let i = 0; i < count; i++) {
      dots.push(<span key={'progress-dots' + Date.now() + i} className={`dot ${i <= step ? 'dot-filled' : ''}`}></span>)
    }
    return dots
  }
  render() {
    return (
      <div className={this.props.className || ''} style={this.props.style}>
        { this.renderDots() }
      </div>
    )
  }
}

export default ProgressDots