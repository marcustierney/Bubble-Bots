class Complete1 extends Phaser.Scene {
    constructor() {
        super('complete1Scene');
    }

    create() {
        // add background
        this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2)
        this.registry.set("OneComplete", 1); // Mark Level One as completed
        // level complete text
        const finalScore = this.registry.get('finalScore')
        const highScore1 = this.registry.get('highScore1')
        this.add.bitmapText(game.config.width/2, game.config.height/4, 'bubble-font', 'LEVEL COMPLETE', 35).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2.4, 'score-font', `SCORE ${finalScore}`, 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'score-font', `HI SCORE ${highScore1}`, 18).setOrigin(0.5)

        this.add.bitmapText(game.config.width/2, game.config.height/1.6, 'text-font', 'Press SPACE To Continue', 25).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.4, 'text-font', 'Press R to Restart', 25).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/1.2, 'text-font', 'Press M for Menu', 25).setOrigin(0.5)
        
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // music
        this.regMusic = this.sound.add('reg-music', {volume: 0.1})
        this.regMusic.play()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.regMusic.stop()
            this.scene.start('Load2Scene')  
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.regMusic.stop()
            this.scene.start('menuScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.regMusic.stop()
            this.scene.start('LevelOneScene')
        }
    }
}