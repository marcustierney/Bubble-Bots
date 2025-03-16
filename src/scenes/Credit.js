class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }
    
    create() {
        // add background
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);

        // display credits text
        this.add.bitmapText(game.config.width/2, game.config.height/4, 'bubble-font', 'CREDITS', 50).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2.2, 'text-font', 'Fonts from DaFont', 30).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.8, 'text-font', 'Sound effects from PixaBay', 30).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.2, 'text-font', 'Press M for Menu', 25).setOrigin(0.5)

        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)  
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // menu
            this.scene.start('menuScene')    
          }
    }
}
