class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.VEL = 100  // slime velocity constant
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })

        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'level1.json')  
    }

    create() {
        //tilemap stuff
        const map = this.add.tilemap('tilemapJSON') 
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')  
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrain = map.createLayer('Terrain', tileset, 0, 0)

        terrain.setCollisionByProperty({ collides: true })

        //const slimeSpawn = map.findObject('Spawns', (obj) => obj.name === 'slimeSpawn')

        // add slime
        this.slime = this.physics.add.sprite(30, 30, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)

        // slime animation
        this.anims.create({
            key: 'jiggle',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1}),
            frameRate: 8,
            repeat: -1
        })
        this.slime.anims.play('jiggle')

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.slime, terrain)

        // input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // slime movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.slime.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}