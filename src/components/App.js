import React, { Component } from 'react';

import Game from '../game/game';

import {
  FILLS,
  DELAY
} from '../game/constants';

const s = styles;

export default class App extends Component {
  constructor() {
    super();

    this._canvas = null;
    this._ctx = null;
  }

  _start = false

  componentDidMount() {
    this._canvas = this.refs.canvas;
    this._ctx = this._canvas.getContext('2d');
    this._game = new Game({
      width: 500,
      height: 500,
      size: 10
    });
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

  handleGetNextYearData() {
    this._game.updateState();
    this._draw();
  }

  handleStartLive() {
    setTimeout(() => {
      if (this._start) {
        this.handleGetNextYearData();
        this.handleStartLive();
      }
    }, DELAY)
  }

  handleStartGame() {
    console.log('Fire start!');
    this._start = true;
    this.handleStartLive();
  }

  handleStopGame() {
    console.log('Fire stop!')
    this._start = false;
  }

  _draw() {
    const game = this._game;

    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    for (var h = 0; h < game.HEIGHT; h++) {
      for (var w = 0; w < game.WIDTH; w++) {

        this._ctx.fillStyle = FILLS[game.matrix[h][w]] || '#fff';

        this._ctx.fillRect(
          w * game.SIZE +1,
          h * game.SIZE +1,
          game.SIZE -1,
          game.SIZE -1);
      }
    }

  }

  render() {
    return (
      <div className={s.Layout}>
        <div className={s.Controls}>
          <div onClick={::this.handleStartGame} className={s.ControlsItem}>Start</div>
          <div onClick={::this.handleStopGame}  className={s.ControlsItem}>Stop</div>
        </div>
        <canvas className={s.Canvas} ref="canvas" width="500" height="500">

        </canvas>
      </div>
    );
  }
}
