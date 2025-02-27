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
    scene: [Menu, Play, Over, Credit]
  }

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyUP, keyDOWN, keyLEFT, keyRIGHT, keySPACE, keyESC, keyR, keyM
