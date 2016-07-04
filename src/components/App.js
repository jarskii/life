import React, { Component } from 'react';

import Game from '../game/game';

import {
  FILLS,
  DEFAULT_GAME_SIZE,
  DEFAULT_GAME_WIDTH,
  DEFAULT_GAME_HEIGHT,
  DELAY
} from '../game/constants';

const s = styles;

export default class App extends Component {
  constructor() {
    super();

    this._canvas = null;
    this._ctx = null;
    this.state = {
      scenario: 1,
      width: DEFAULT_GAME_HEIGHT,
      height: DEFAULT_GAME_HEIGHT,
      size: DEFAULT_GAME_SIZE
    }
  }

  _start = false;

  componentDidMount() {
    this._canvas = this.refs.canvas;
    this._ctx = this._canvas.getContext('2d');
  }
  _checkOffset(height) {
    if (this.state.size === 0) {
      throw new Error('Need size > 0');
    }
    let nextHeight = height;
    const size = this.state.size;

    (function iterable(height) {
      if((height/size) % 1 === 0) {
        nextHeight = height;
      }  else {
        iterable(height - 1);
      }
    })(nextHeight);

    return nextHeight;
  }
  _initialGame() {
    const {
      height,
      size,
      scenario,
    } = this.state;

    const fieldSize = this._checkOffset(height);

    this.setState({
      width: fieldSize,
      height: fieldSize,
    });

    this._game = new Game({
      width:  fieldSize,
      height:  fieldSize,
      size,
      scenario
    });
  }

  handleStartLive() {
    setTimeout(() => {
      if (this._start) {
        this._game.updateState();
        this._draw();
        this.handleStartLive();
      }
    }, DELAY)
  }

  handleStartGame() {
    this._start = true;
    this._initialGame();
    this.handleStartLive();
  }

  handleStopGame() {
    this._start = false;
  }

  handleResetGame() {
    this._start = false;
    this._game.reset();
    this._clear();
  }

  handleChangeSize(e) {
    let size = Number(e.target.value);

    this.setState({
      size
    });
    this.handleStopGame();
    this._clear()
  }
  handleChangeScenario(e) {
    let scenario = Number(e.target.value);

    this.setState({
      scenario
    });
    this.handleStopGame();
    this._clear()
  }
  _clear() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  _draw() {
    const game = this._game;

    for (var h = 0; h < game.HEIGHT; h++) {
      for (var w = 0; w < game.WIDTH; w++) {

        this._ctx.fillStyle = FILLS[game.matrix[h][w].status];


        this._ctx.fillRect(
          w * game.SIZE +1,
          h * game.SIZE +1,
          game.SIZE -1,
          game.SIZE -1);
      }
    }

  }

  render() {
    const {
      width,
      height
    } = this.state;

    return (
      <div className={s.Layout}>
        <div className={s.Controls}>
          <div onClick={::this.handleStartGame} className={s.ControlsItem}>Start</div>
          <div onClick={::this.handleStopGame}  className={s.ControlsItem}>Stop</div>
          <div onClick={::this.handleResetGame}  className={s.ControlsItem}>Reset</div>
          <input
              className={s.Input}
              value={this.state.size}
              onChange={::this.handleChangeSize}
              maxLength="2"
              type="text"
          />
          <code className={s.Hint}>
            {'<--- cell size (> 2)'}
          </code>
        </div>
        <canvas className={s.Canvas} ref="canvas" width={width} height={height}>

        </canvas>
        <div className={s.Controls}>
          <input
              className={s.Input}
              value={this.state.scenario}
              onChange={::this.handleChangeScenario}
              maxLength="2"
              type="text"
          />
          <code className={s.Hint}>
            {'<--- scenario (1,2,3)'}
          </code>
        </div>
      </div>
    );
  }
}
