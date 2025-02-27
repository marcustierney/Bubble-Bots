class LevelOne extends Phaser.Scene {
    constructor() {
        super('LevelOneScene')
    }

    init() {
        this.VEL = 90      // Max horizontal speed
        this.JUMP_VEL = -290 // Jump height
        this.ACCEL = 120   // Acceleration for movement
        this.DRAG = 700    // Drag Speed
        this.GRAVITY = 500 // Gravity strength
        this.E1VEL = 25
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('enemy1', 'enemy1.png')
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'level1.json')  
    }

    create() {
        // Tilemap setup
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrain = map.createLayer('Terrain', tileset, 0, 0)
        const lava = map.createLayer('Lava', tileset, 0, 0)
        const door = map.createLayer('Door', tileset, 0, 0)
        const paths = map.createLayer('EnemyPaths', tileset, 0, 0) 

        terrain.setCollisionByProperty({ collides: true })
        lava.setCollisionByProperty({ collides: true }) 
        door.setCollisionByProperty({ collides: true })
        paths.setCollisionByProperty({ collides: true })

        const Enemy1Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy1Spawn')

        // Add slime
        this.slime = this.physics.add.sprite(30, 30, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)

        this.slime.body.setGravityY(this.GRAVITY) // Apply gravity
        this.slime.body.setMaxVelocity(this.VEL, 400) // Max speed
        this.slime.body.setDamping(true) // Enable damping

        // Apply strong drag to stop movement faster
        this.slime.body.setDragX(this.DRAG)

        //Enemy1
        this.enemy1 = this.physics.add.sprite(Enemy1Spawn.x, Enemy1Spawn.y, 'enemy1', 0).setScale(0.5)
        this.enemy1.body.setCollideWorldBounds(true)
        this.enemy1.body.setGravityY(this.GRAVITY)
        this.enemy1.body.setVelocityX(this.E1VEL)

        // Slime animation
        this.anims.create({
            key: 'jiggle',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1
        })
        this.slime.anims.play('jiggle')

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.slime, terrain)
        this.physics.add.collider(this.slime, lava, this.respawnSlime, null, this)
        this.physics.add.collider(this.slime, door, this.levelComplete, null, this)
        this.physics.add.collider(this.enemy1, terrain)
        this.physics.add.collider(this.enemy1, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.slime, this.enemy1, this.respawnSlime, null, this)

        // Input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // Adjust drag based on whether the slime is in the air
        if (this.slime.body.blocked.down) {
            this.slime.body.setDragX(this.DRAG) // Strong drag on ground
        } else {
            this.slime.body.setDragX(200) // Lighter drag in air for better control
        }

        
        if (this.cursors.left.isDown) {
            this.slime.body.setAccelerationX(-this.ACCEL)
        } else if (this.cursors.right.isDown) {
            this.slime.body.setAccelerationX(this.ACCEL)
        } else {
            this.slime.body.setAccelerationX(0) // Stops acceleration when no key is pressed
            this.slime.body.setVelocityX(0) // Instantly stop movement when key is released
        }

        // Jumping 
        if (this.cursors.up.isDown && this.slime.body.blocked.down) {
            this.slime.body.setVelocityY(this.JUMP_VEL) 
        }
    }
    respawnSlime() {
        this.scene.start('overScene')
    }

    levelComplete() {
        this.scene.start('completeScene')
    }
   enemyMovement() {
        if (this.E1VEL > 0) {
            this.E1VEL = -this.E1VEL
        }
        else if (this.E1VEL < 0) {
            this.E1VEL = -this.E1VEL
        }
        this.enemy1.setVelocityX(this.E1VEL)        
   }
}
