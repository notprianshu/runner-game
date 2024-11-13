import Phaser from 'phaser'
import Game from './scenes/game.js'

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
  scene: Game 
}

const game = new Phaser.Game(config);