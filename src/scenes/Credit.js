class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }
    
    create() {
        //define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)  
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // menu
            this.scene.start('menuScene')    
          }
    }
}
