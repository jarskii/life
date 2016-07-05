import React, { Component } from 'react';
const s = styles;

export default class Canvas extends Component {
  constructor() {
    super();
    this.state = {}
  }
  getElement() {
    return this.refs.canvas;
  }
  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <canvas
        className={s.Canvas}
        ref="canvas"
        width={width}
        height={height}
      >
      </canvas>
    );
  }
}
