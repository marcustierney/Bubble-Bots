class Over extends Phaser.Scene {
    constructor() {
        super('overScene');
    }

    create() {
        // Display the "GAME OVER" message in the center of the screen
        this.add.text(width / 2, height / 4, 'GAME OVER', {
            fontSize: '32px',
            fill: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);

        // Instructions for restarting the game
        this.add.text(width / 2, height / 2, 'Press R to Restart', {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        this.add.text(width / 2, height / 1.5, 'Press M for Menu', {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        //keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('LevelOneScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
        //if (Phaser.Input.Keyboard.JustDown(keyC)) {
        //    this.scene.start('creditScene')
        //}
    }

}