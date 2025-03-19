class Direction extends Phaser.Scene {
    constructor() {
        super('directionScene')
    }
    
    create() {
        // add background
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);

        // display directions text
        this.add.bitmapText(game.config.width/2, game.config.height/4, 'bubble-font', 'DIRECTIONS', 50).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2.2, 'text-font', 'Use ARROW keys to Move', 32).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.75, 'text-font', 'Press A to shoot Enemies', 32).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.35, 'text-font', 'Press M for Menu', 25).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.2, 'text-font', 'and C for Credits', 25).setOrigin(0.5)

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