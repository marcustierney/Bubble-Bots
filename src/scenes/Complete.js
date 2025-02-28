class Complete extends Phaser.Scene {
    constructor() {
        super('completeScene');
    }

    create() {
        this.add.text(width / 2, height / 4, 'Level Complete', {
            fontSize: '32px',
            fill: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 1.5, 'Press M for Menu', {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }
}