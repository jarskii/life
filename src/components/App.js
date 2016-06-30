import React, { Component } from 'react';

const s = styles;

export default class App extends Component {
  constructor() {
    super();

    this._canvas = null;
    this._ctx = null;
  }
  year = 1
  componentDidMount() {
    this._canvas = this.refs.canvas;
    this._ctx = this._canvas.getContext('2d');

    this.handleStartLive();
  }
  _drawRect({ width, height, x, y, fill = 'black'}) {
    const context = this._ctx;

    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = fill;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = fill;
    context.stroke();
  }
  handleNextYear() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    this._ctx.fillText(++this.year, 150, 100);
  }
  handleStartLive() {
    setTimeout(() => {
      this.handleNextYear();
      this.handleStartLive();
    }, 500)
  }
  render() {
    return (
      <div className={s.Layout}>
        <canvas className={s.Canvas} ref="canvas" width="500" height="500">

        </canvas>
      </div>
    );
  }
}
