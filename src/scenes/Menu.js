class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    preload() {
        // load images/tile sprites
        this.load.image('enemy-left', './assets/enemy-l-128.png')
        this.load.image('enemy-right', './assets/enemy-r-128.png')
        this.load.image('robot-menu', './assets/menu-cover.png')
        this.load.image('bubble-menu', './assets/bubble-cover.png')
        this.load.image('ball-enemy', './assets/ball-enemy.png')
        this.load.image('select-icon', './assets/select-icon.png')
        // load bitmap font
        this.load.bitmapFont('bubble-font', 'assets/bubble-font.png', 'assets/bubble-font.xml')
        this.load.bitmapFont('square-font', 'assets/square-font.png', 'assets/square-font.xml')
        this.load.bitmapFont('score-font', 'assets/score.png', 'assets/score.xml')
        this.load.bitmapFont('over-font', 'assets/over.png', 'assets/over.xml')

        // load music
        this.load.audio('splash-music', './assets/splash.mp3')
        this.load.audio('shoot-music', './assets/shoot.mp3')
        this.load.audio('background-music', './assets/background.mp3')
        this.load.audio('background-music1', './assets/background1.mp3')
        
    }
    

    create() {
        // sprites
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);
        this.add.image(game.config.width/2, game.config.height/2, 'robot-menu').setOrigin(0.53,0.456);
 
        // display menu text
        this.add.bitmapText(game.config.width/1.35, game.config.height/3.5, 'bubble-font', 'BUBBLE', 45).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.35, game.config.height/2.2, 'bubble-font', 'BOTS', 45).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.42, game.config.height/1.25, 'square-font', 'Press SPACE to Play', 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.4, game.config.height/1.1, 'square-font', 'and D for Directions', 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/1.4, game.config.height/1.45, 'square-font', 'L for Level Select', 18).setOrigin(0.5)
       
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)     
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // play
          this.scene.start('Load1Scene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
          // direction
          this.scene.start('directionScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyL)) {
          // level select
          this.scene.start('LevelSelectScene')    
        }
      }
}