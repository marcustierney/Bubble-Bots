class Complete extends Phaser.Scene {
    constructor() {
        super('completeScene');
    }

    create() {
        // add background
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2)

        // level complete text
        const finalScore = this.registry.get('finalScore')
        const highScore = this.registry.get('highScore')
        this.add.bitmapText(game.config.width/2, game.config.height/4, 'bubble-font', 'LEVEL COMPLETE', 35).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2.4, 'score-font', `SCORE ${finalScore}`, 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'score-font', `HI SCORE ${highScore}`, 18).setOrigin(0.5)

        this.add.bitmapText(game.config.width/2, game.config.height/1.4, 'square-font', 'Press R to Restart', 20).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.2, 'square-font', 'Press M for Menu', 20).setOrigin(0.5)
        
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('LevelOneScene')
        }
    }
}