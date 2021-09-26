import React from 'react'
import { connect } from 'react-redux'

class Counter extends React.PureComponent {
  constructor(props) {
    super(props)
    console.log('props===', props)
  }

  handlePlus = () => {
    this.props.plus()
  }

  handleMinus = () => {
    this.props.minus()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleMinus}>-</button>
        <span>{this.props.count}</span>
        <button onClick={this.handlePlus}>+</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.rootReducer.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    plus: () => dispatch({ type: 'plus' }),
    minus: () => dispatch({ type: 'minus' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
