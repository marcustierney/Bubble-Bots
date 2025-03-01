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
    }
    

    create() {
        // sprites
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);
        this.add.image(game.config.width/2, game.config.height/2, 'robot-menu').setOrigin(0.53,0.45);


        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
            fontStyle: 'bold',
            color: '#e754ca',
            align: 'right',
            fixedWidth: 0
        }

        let tutorialConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            fontStyle: 'bold',
            color: '#e754ca',
            align: 'right',
            fixedWidth: 0
        }
        
        // display menu text
        this.add.text(game.config.width/1.4, game.config.height/3.5, 'Bubble', menuConfig).setOrigin(0.5).setScale(0.5)
        this.add.text(game.config.width/1.4, game.config.height/2.5, 'Bots', menuConfig).setOrigin(0.5).setScale(0.5)
        this.add.text(game.config.width/1.4, game.config.height/1.2, 'Press SPACE to Play', tutorialConfig).setOrigin(0.5).setScale(0.3)
        this.add.text(game.config.width/1.4, game.config.height/1.1, 'and C for Credits', tutorialConfig).setOrigin(0.5).setScale(0.3)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
       
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