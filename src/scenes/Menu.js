class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload() {
        // load images/tile sprites
        this.load.image('arrows', './assets/arrows.png')
        this.load.image('esc', './assets/esc.png')
        this.load.image('spacebar', './assets/spacebar.png')
        this.load.image('enemy-left', './assets/enemy-l-128.png')
        this.load.image('enemy-right', './assets/enemy-r-128.png')
        this.load.image('robot-menu', './assets/menu-cover.png')
        this.load.image('bubble-menu', './assets/bubble-cover.png')
        // this.load.spritesheet('character', 'character-sheet.png', {
        //     frameWidth: 32,
        //     fameHeight: 32
        // })

        // load bitmap font
        this.load.bitmapFont('bubble-font', 'assets/bubble-font.png', 'assets/bubble-font.xml')
        this.load.bitmapFont('square-font', 'assets/square-font.png', 'assets/square-font.xml')
    }
    

    create() {
        // sprites
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);
        this.add.image(game.config.width/2, game.config.height/2, 'robot-menu').setOrigin(0.53,0.456);

        // display menu text
        this.add.bitmapText(game.config.width/1.35, game.config.height/3.5, 'bubble-font', 'BUBBLE', 45).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.35, game.config.height/2.2, 'bubble-font', 'BOTS', 45).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.37, game.config.height/1.2, 'square-font', 'Press SPACE to Play', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.37, game.config.height/1.1, 'square-font', 'and C for Credits', 16).setOrigin(0.5)
       
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)     
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // play
          this.scene.start('LevelOneScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
          // credit
          this.scene.start('creditScene')    
        }
      }
}