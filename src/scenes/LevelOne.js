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
        this.DIR = 200
        this.startingScore = 200000
        this.score = this.startingScore
        this.highScore = this.registry.get('highScore') || 0
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        //this.load.image('enemy1', 'enemy1.png')
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'level1.json')  
        this.load.image('ball', 'ball.png')
    }

    create() {
        // Score Display
        this.scoreText = this.add.text(260, 10, `${this.score}`, {
            fontSize: '14px',
            fill: '#ffffff'
        }).setScrollFactor(0).setDepth(10)
        
        // High Score Display
        this.highScoreText = this.add.text(100, 10, `HI SCORE-${this.highScore}`, {
            fontSize: '14px',
            fill: '#FFF220'
        }).setScrollFactor(0).setDepth(10); // Align to the right

        // Timer to decrease score
        this.scoreTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.score = Math.max(0, this.score - 1000);
                this.scoreText.setText(`${this.score}`);
            },
            callbackScope: this,
            loop: true
        });

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
        this.enemy1 = this.physics.add.sprite(Enemy1Spawn.x, Enemy1Spawn.y, 'enemy-left', 0).setScale(0.3)
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
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.balls = this.physics.add.group()
        this.physics.add.collider(this.balls, terrain, (ball) => ball.destroy())
        this.physics.add.collider(this.balls, this.enemy1, (ball, enemy) => {
            this.score += 100
            this.scoreText.setText(`${this.score}`)
            ball.destroy()
            enemy.destroy()
            const plus100Text = this.add.text(enemy.x, enemy.y - 20, '+100', {
                fontSize: '10px',
                fill: '#FFF220',
                fontStyle: 'bold'
            }).setOrigin(0.5, 0.5); // Position the text above the enemy
        
            // Fade out the "+100" text and destroy it after a delay
            this.tweens.add({
                targets: plus100Text,
                alpha: 0,
                y: plus100Text.y - 30, // Move the text up
                duration: 500,
                onComplete: () => {
                    plus100Text.destroy(); // Destroy the text after the animation
                }
            });
        })
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject) {
                body.gameObject.destroy()
            }
        })
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
        // Attack
        if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            this.shootBall()
        }
        if (this.cursors.left.isDown) {
            this.DIR = -200
            console.log('left')
        } 
        else if (this.cursors.right.isDown) {
            this.DIR = 200
            console.log('right')
        }
        
    }
    respawnSlime() {
        this.score = this.startingScore; // Reset score on death
        this.scene.start('overScene')
    }

    levelComplete() {
        // Update the high score if the current score is higher
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.registry.set('highScore', this.highScore); // Store the new high score
            this.highScoreText.setText(`HI SCORE-${this.highScore}`);
        }
        this.registry.set('finalScore', this.score);
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
   shootBall() {
        let ball = this.balls.create(this.slime.x, this.slime.y, 'ball').setScale(0.3)
        ball.body.setCollideWorldBounds(true)
        ball.body.onWorldBounds = true
        ball.body.allowGravity = false
        ball.setVelocityX(this.DIR)
    }
}
