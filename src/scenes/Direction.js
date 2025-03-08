class Direction extends Phaser.Scene {
    constructor() {
        super('directionScene')
    }
    
    create() {
        // add background
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);

        // display directions text
        this.add.bitmapText(game.config.width/2, game.config.height/4, 'bubble-font', 'DIRECTIONS', 45).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2.2, 'square-font', 'Use arrows keys to move', 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.8, 'square-font', 'Press A to shoot bubbles', 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.35, 'square-font', 'Press M for Menu', 16).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.2, 'square-font', 'and C for Credits', 16).setOrigin(0.5)

        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)  
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // menu
            this.scene.start('menuScene')    
          }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // credit
            this.scene.start('creditScene')    
        }
    }
}