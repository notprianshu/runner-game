import Phaser from 'phaser'
import Game from './scenes/game.js'
import GameOver from './scenes/gameover.js'

const config = {
  height: 300,
  widht: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: '#87CEEB',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 350},
      // debug: true
    }
  },
  scene: [Game, GameOver]
}

const game = new Phaser.Game(config);