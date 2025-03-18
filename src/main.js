// Bubble Bots by Bhavya Anil and Marcus Tierney

// Phaser's major components used: physics systems, cameras, text objects, timers,
//                                 tilemaps, animation manager, tween manager

let config = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
          debug: false,
      } 
    },
    zoom: 2,
    scene: [Menu, LevelSelect, LevelOne, LevelTwo, Over, Over2, Credit, Complete1, Complete2, Direction, Load1, Load2]
  }

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keySPACE, keyR, keyM, keyC, keyD, keyL 
