class LevelSelect extends Phaser.Scene {
    constructor() {
        super("LevelSelectScene")
    }

    create() {
      this.OneComplete = this.registry.get("OneComplete") || 0; // Default to 0 if not set
      // sprites
      this.add.image(game.config.width/2, game.config.height/2, 'bubble-menu').setOrigin(0.5,0.5).setScale(0.2)
 
      // display menu text
      this.add.bitmapText(game.config.width/2, game.config.height/4, 'bubble-font', 'Level Select', 45).setOrigin(0.5)
      this.add.bitmapText(game.config.width/2, game.config.height/2, 'text-font', 'Level One', 25).setOrigin(0.5)
      this.levelTwoText = this.add.bitmapText(game.config.width/2, game.config.height/1.5, 'text-font', 'Level Two', 25).setOrigin(0.5)
      this.selector = this.add.image(game.config.width/2, game.config.height/2, 'select-icon').setOrigin(0.5,0.5).setScale(0.3);
      
      if (this.OneComplete === 0) {
        this.levelTwoText.setTint(0x000000); // Grey out locked level
      }
      // define keys
      this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
      this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
      this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

      this.selectedLevel = 1; // Start on level 1
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(this.keyDOWN) && this.selectedLevel === 1 && this.OneComplete === 1) {
          this.selectedLevel = 2;
          this.selector.setY(game.config.height/1.5);
      } 
      
      if (Phaser.Input.Keyboard.JustDown(this.keyUP) && this.selectedLevel === 2) {
          this.selectedLevel = 1;
          this.selector.setY(game.config.height/2);
      }

      if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
          if (this.selectedLevel === 1) {
              this.scene.start('Load1Scene');
          } else if (this.selectedLevel === 2) {
              this.scene.start('Load2Scene');
          }
      }
    } 
}