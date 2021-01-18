import React, { Component } from 'react'


export default class Button extends Component {
  render() {
    const { onClick, disabled, children } = this.props;
    return (
      <button onClick={ onClick } disabled={disabled}>{children}</button>
    );
  }
}
