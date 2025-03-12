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
          debug: true,
      } 
    },
    zoom: 2,
    scene: [Menu, LevelOne, LevelTwo, Over, Over2, Credit, Complete1, Complete2, Direction, Load1, Load2]
  }

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keySPACE, keyR, keyM, keyC, keyD 
