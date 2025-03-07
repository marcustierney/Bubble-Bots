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
        this.load.spritesheet('robot-sheet', 'robot-sheet.png', {
            frameWidth: 35,
            frameHeight: 57
        })
 
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'level1.json')  
        this.load.image('ball', 'ball.png')
        this.load.image('enemy-left', 'enemy-l-128.png')
        this.load.image('enemy-right', 'enemy-r-128.png')
    }

    create() {
        // Score Display
        this.scoreText = this.add.text(260, 10, `${this.score}`, {
            fontSize: '14px',
            fill: '#ffffff'
        }).setScrollFactor(0).setDepth(10)
        
        // High Score Display
        this.highScoreText = this.add.bitmapText(100, 10, 'score-font', `HI SCORE-${this.highScore}`, 18).setScrollFactor(0).setDepth(10); // Align to the right

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

        // Add robot
        this.robot = this.physics.add.sprite(30, 30, 'robot-sheet', 0).setScale(.9)
        this.robot.body.setCollideWorldBounds(true)
        this.robot.body.setSize(32,50)
        this.robot.body.setGravityY(this.GRAVITY) // Apply gravity
        this.robot.body.setMaxVelocity(this.VEL, 400) // Max speed
        this.robot.body.setDamping(true) // Enable damping

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


        // Apply strong drag to stop movement faster
        this.robot.body.setDragX(this.DRAG)

        //Enemy1
        this.enemy1 = this.physics.add.sprite(Enemy1Spawn.x, Enemy1Spawn.y, 'enemy-left', 0).setScale(0.55)
        this.enemy1.body.setSize(82,78)
        this.enemy1.body.setOffset(0,0)
        this.enemy1.body.setCollideWorldBounds(true)
        this.enemy1.body.setGravityY(this.GRAVITY)
        this.enemy1.body.setVelocityX(this.E1VEL)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.robot, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.robot, terrain)
        this.physics.add.collider(this.robot, lava, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, door, this.levelComplete, null, this)
        this.physics.add.collider(this.enemy1, terrain)
        this.physics.add.collider(this.enemy1, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.robot, this.enemy1, this.respawnRobot, null, this)

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
        // Adjust drag based on whether the robot is in the air
        if (this.robot.body.blocked.down) {
            this.robot.body.setDragX(this.DRAG) // Strong drag on ground
        } else {
            this.robot.body.setDragX(200) // Lighter drag in air for better control
        }

        let robotMovement = 'walk'
        if (this.cursors.left.isDown) {
            this.robot.body.setAccelerationX(-this.ACCEL)
            this.lastDirection = 'left'
        } else if (this.cursors.right.isDown) {
            this.robot.body.setAccelerationX(this.ACCEL)
            this.lastDirection = 'right'
        } else {
            this.robot.body.setAccelerationX(0) // Stops acceleration when no key is pressed
            this.robot.body.setVelocityX(0) // Instantly stop movement when key is released
            robotMovement = 'idle'
        }

        // Jumping 
        if (this.cursors.up.isDown && this.robot.body.blocked.down) {
            this.robot.body.setVelocityY(this.JUMP_VEL) 
        }
        if (this.cursors.right.isDown) {
            this.DIR = 200
            console.log('right')
            this.lastDirection = 'right'
        }
        if (this.cursors.left.isDown) {
            this.DIR = -200
            console.log('left')
            this.lastDirection = 'left'
        }
        // Attack
        if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            this.shootBall()
        }
        if (this.shootKey.isDown) {
            this.robot.play('shoot-' + this.lastDirection, true)
        }
        else {
            this.robot.play(robotMovement + '-' + this.lastDirection, true)
        } 
        
    }
    respawnRobot() {
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
        let ball = this.balls.create(this.robot.x, this.robot.y, 'ball').setScale(0.2)
        ball.body.setCollideWorldBounds(true)
        ball.body.onWorldBounds = true
        ball.body.allowGravity = false
        ball.setVelocityX(this.DIR)
    }
}
