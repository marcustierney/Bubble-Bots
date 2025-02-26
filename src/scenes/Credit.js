class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }
    
    create() {
        //define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)  
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            // menu
            this.scene.start('menuScene')    
          }
    }
}
