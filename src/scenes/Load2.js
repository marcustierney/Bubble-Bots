class Load2 extends Phaser.Scene {
    constructor() {
        super('Load2Scene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('robot-sheet', 'robot-sheet.png', {
            frameWidth: 35,
            frameHeight: 57
        })
 
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemap2JSON', 'level2.json')  
        this.load.image('ball', 'ball.png')
        this.load.image('enemy-left', 'enemy-l-128.png')
        this.load.image('enemy-right', 'enemy-r-128.png')
        this.load.image('platform', 'platform1.png')
        this.load.audio('splash-music', './assets/splash.mp3')
        this.load.audio('shoot-music', './assets/shoot.mp3')
        this.load.audio('background-music', './assets/background.mp3')
        this.load.audio('background-music1', './assets/background1.mp3')
    }

    create() {
        // Robot animations
        this.anims.create({
            key: 'walk-right',
            frameRate: 10, 
            repeat: -1,
            frames: this.anims.generateFrameNames('robot-sheet', {
                start: 0,
                end: 3
            })
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 10, 
            repeat: -1,
            frames: this.anims.generateFrameNames('robot-sheet', {
                start: 4,
                end: 7
            })
        })
        this.anims.create({
            key: 'idle-left',
            frameRate: 10, 
            repeat: -1,
            frames: this.anims.generateFrameNames('robot-sheet', {
                start: 7,
                end: 7
            })
        })
        this.anims.create({
            key: 'idle-right',
            frameRate: 10, 
            repeat: -1,
            frames: this.anims.generateFrameNames('robot-sheet', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'shoot-right',
            frameRate: 1, 
            repeat: 0,
            frames: this.anims.generateFrameNames('robot-sheet', {
                start: 1,
                end: 1
            })
        })
        this.anims.create({
            key: 'shoot-left',
            frameRate: 10, 
            repeat: 0,
            frames: this.anims.generateFrameNames('robot-sheet', {
                start: 6,
                end: 6
            })
        })

        // proceed once loading completes
        this.scene.start('LevelTwoScene') 
    }
}
