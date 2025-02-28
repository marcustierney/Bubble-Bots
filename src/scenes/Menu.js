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
        this.load.spritesheet('character', 'character-sheet.png', {
            frameWidth: 32,
            fameHeight: 32
        })
    }
    

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '70px',
            fontStyle: 'bold',
            color: '#843605',
            align: 'right',
            fixedWidth: 0
        }
        let tutorialConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#843605',
            align: 'right',
            fixedWidth: 0
        }
        
        // display menu text
        //this.background = this.add.tileSprite(0, 0, 800, 800, 'menu-background').setOrigin(0, 0)
        this.add.image(game.config.width - 50, -5, 'arrows').setOrigin(1, 0).setScale(.6)
        this.add.image(520, 25, 'esc').setOrigin(1, 0).setScale(.6)
        this.add.image(300, 25, 'spacebar').setOrigin(1, 0).setScale(.6)
        this.add.text(185, 190, 'Start Game', tutorialConfig).setOrigin(0.5)
        //this.add.text(410, 190, 'Pause Game', tutorialConfig).setOrigin(0.5)
        this.add.text(640, 190, 'Move Character', tutorialConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Bubble Bots', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
       
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)     
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN) 
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC) 
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // play
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // credit
          this.scene.start('creditScene')    
        }
      }
}