class Over2 extends Phaser.Scene {
    constructor() {
        super('over2Scene');
    }

    create() {
        // add background
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2);

        // Display the "GAME OVER" message in the center of the screen
        this.add.bitmapText(game.config.width/2, game.config.height/4, 'over-font', 'GAME OVER', 45).setOrigin(0.5)

        // Instructions for restarting the game
        this.add.bitmapText(game.config.width/2, game.config.height/2.2, 'square-font', 'Press R to Restart', 20).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.8, 'square-font', 'Press M for Menu', 20).setOrigin(0.5)

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('LevelTwoScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }

}