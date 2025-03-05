class Complete extends Phaser.Scene {
    constructor() {
        super('completeScene');
    }

    create() {
        const finalScore = this.registry.get('finalScore')
        const highScore = this.registry.get('highScore')
        this.add.text(width / 2, height / 4, 'Level Complete', {
            fontSize: '32px',
            fill: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(width / 2, height / 2, `SCORE ${finalScore}`, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(width / 2, height / 1.5, `HI SCORE ${highScore}`, {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(width / 2, height / 1.2, 'Press R to Restart', {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        this.add.text(width / 2, height / 1.1, 'Press M for Menu', {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
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