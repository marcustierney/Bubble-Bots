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
        this.EVEL = 25
        this.DIR = 200
        this.startingScore = 200000
        this.score = this.startingScore
        this.highScore1 = this.registry.get('highScore1') || 0
    }

    create() {
        // Score Display
        this.scoreText = this.add.text(260, 10, `${this.score}`, {
            fontSize: '14px',
            fill: '#ffffff'
        }).setScrollFactor(0).setDepth(10)
        
        // High Score Display
        this.highScore1Text = this.add.bitmapText(100, 10, 'score-font', `HI SCORE-${this.highScore1}`, 18).setScrollFactor(0).setDepth(10); // Align to the right

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

        // Music
        this.splashMusic = this.sound.add('splash-music', {volume: 0.2})
        this.splashMusicPlaying = false
        this.shootMusic = this.sound.add('shoot-music', {volume: 0.3})
        this.shootMusicPlaying = false
        this.backgroundMusic = this.sound.add('background-music', {volume: 0.15, loop: true})
        this.backgroundMusic.play()

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
        const Enemy2Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy2Spawn')
        const Enemy3Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy3Spawn')
        
        // Add robot
        this.robot = this.physics.add.sprite(30, 210, 'robot-sheet', 0).setScale(.9)
        this.robot.body.setCollideWorldBounds(true)
        this.robot.body.setSize(18,50)
        this.robot.body.setGravityY(this.GRAVITY) // Apply gravity
        this.robot.body.setMaxVelocity(this.VEL, 400) // Max speed
        this.robot.body.setDamping(true) // Enable damping
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)   

        // Apply strong drag to stop movement faster
        this.robot.body.setDragX(this.DRAG)

        //Enemy1
        this.enemy1 = this.physics.add.sprite(Enemy1Spawn.x, Enemy1Spawn.y, 'enemy-left', 0).setScale(.55)
        this.enemy1.body.setSize(63,70)
        this.enemy1.body.setOffset(0,0)
        this.enemy1.body.setCollideWorldBounds(true)
        this.enemy1.body.setGravityY(this.GRAVITY)
        this.enemy1.body.setVelocityX(25)

        //Enemy2
        this.enemy2 = this.physics.add.sprite(Enemy2Spawn.x, Enemy2Spawn.y, 'enemy-left', 0).setScale(.55)
        this.enemy2.body.setSize(63,70);
        this.enemy2.body.setOffset(0, 0);
        this.enemy2.body.setCollideWorldBounds(true);
        this.enemy2.body.setGravityY(this.GRAVITY);
        this.enemy2.body.setVelocityX(25)

        //Enemy3
        this.enemy3 = this.physics.add.sprite(Enemy3Spawn.x, Enemy3Spawn.y, 'enemy-left', 0).setScale(.5)
        this.enemy3.body.setSize(63,70);
        this.enemy3.body.setOffset(0, 0);
        this.enemy2.body.setCollideWorldBounds(true);
        this.enemy3.body.setGravityY(this.GRAVITY);
        this.enemy3.body.setVelocityX(25)

        this.enemy3ShootTimer = this.time.addEvent({
            delay: 3000, // Every 3 seconds
            callback: this.shootEnemy3Balls,
            callbackScope: this,
            loop: true
        });

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.robot, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.robot, terrain)
        this.physics.add.collider(this.robot, lava, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, door, this.levelComplete, null, this)
        this.physics.add.collider(this.enemy1, terrain)
        this.physics.add.collider(this.enemy2, terrain)
        this.physics.add.collider(this.enemy3, terrain)
        this.physics.add.collider(this.robot, this.enemy1, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy2, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy3, this.respawnRobot, null, this)
        this.physics.add.collider(this.enemy1, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy2, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy3, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy1, paths, () => {
            this.enemyMovement(this.enemy1);
        });
        this.physics.add.collider(this.enemy2, paths, () => {
            this.enemyMovement(this.enemy2);
        }); 
        this.physics.add.collider(this.enemy3, paths, () => {
            this.enemyMovement(this.enemy3);
        });

        // Input
        this.cursors = this.input.keyboard.createCursorKeys()
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.balls = this.physics.add.group()
        this.physics.add.collider(this.balls, terrain, (ball) => ball.destroy())

        this.physics.add.collider(this.balls, this.enemy1, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy2, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy3, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.robot, this.robotHit, null, this)

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
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.robot.body.blocked.down) {
            this.robot.body.setVelocityY(this.JUMP_VEL) 
        }
        if (this.cursors.right.isDown) {
            this.DIR = 200
            this.lastDirection = 'right'
        }
        if (this.cursors.left.isDown) {
            this.DIR = -200
            this.lastDirection = 'left'
        }
        // Attack
        if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            this.shootMusic.play()
            this.shootMusicPlaying = true;
            this.shootBall()
        }
        if (this.shootKey.isDown) {
            this.robot.play('shoot-' + this.lastDirection, true)
        }
        else {
            this.robot.play(robotMovement + '-' + this.lastDirection, true)
        }
        this.balls.children.each((ball) => { //Loops through each ball and destorys after 200 pixels
            if (Math.abs(ball.x - ball.startX) > 200) {
                ball.destroy();
            }
        }, this); 

        if (this.enemy3.active === false) { // Check if enemy3 is destroyed 
            this.enemy3ShootTimer.remove()
        }
    }

    respawnRobot() {
        this.score = this.startingScore; // Reset score on death
        this.backgroundMusic.stop()
        this.splashMusic.play()
        this.splashMusicPlaying = true;
        this.scene.start('overScene')
    }

    levelComplete() {
        // Update the high score if the current score is higher
        if (this.score > this.highScore1) {
            this.highScore1 = this.score;
            this.registry.set('highScore1', this.highScore1); // Store the new high score
            this.highScore1Text.setText(`HI SCORE-${this.highScore1}`);
        }
        this.registry.set('finalScore', this.score);
        this.scene.start('complete1Scene')
    }
    
   shootBall() {
        let ball = this.balls.create(this.robot.x, this.robot.y, 'ball').setScale(0.2)
        ball.body.setSize(50, 50)
        ball.body.setCollideWorldBounds(true)
        ball.body.onWorldBounds = true
        ball.body.allowGravity = false
        ball.setVelocityX(this.DIR)

        ball.startX = this.robot.x
    }
    enemyMovement(enemy) {
        if (this.EVEL > 0) {
            enemy.setTexture('enemy-left')
        }
        else if (this.EVEL < 0) {
            enemy.setTexture('enemy-right')
        }
        this.EVEL = -this.EVEL
        enemy.body.setVelocityX(this.EVEL)  
   }
    enemyHit (ball, enemy) {
        this.score += 100;
        this.scoreText.setText(`${this.score}`);
        ball.destroy();
        enemy.destroy();
        const plus100Text = this.add.text(enemy.x, enemy.y - 20, '+100', { //Add 100 points text
            fontSize: '10px',
            fill: '#FFF220',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);
    
        this.tweens.add({
            targets: plus100Text,
            alpha: 0,
            y: plus100Text.y - 30,
            duration: 500,
            onComplete: () => {
                plus100Text.destroy();
            }
        });
    }
    shootEnemy3Balls() {
        // Shoot a ball to the right
        let ballRight = this.balls.create(this.enemy3.x, this.enemy3.y, 'ball-enemy').setScale(0.2);
        ballRight.body.setSize(50, 50);
        ballRight.body.setCollideWorldBounds(true);
        ballRight.body.allowGravity = false;
        ballRight.setVelocityX(150); 
        ballRight.startX = this.enemy3.x;
        // Shoot a ball to the left
        let ballLeft = this.balls.create(this.enemy3.x, this.enemy3.y, 'ball-enemy').setScale(0.2);
        ballLeft.body.setSize(50, 50);
        ballLeft.body.setCollideWorldBounds(true);
        ballLeft.body.allowGravity = false;
        ballLeft.setVelocityX(-150); 
        ballLeft.startX = this.enemy3.x
    }
    robotHit() { //If player is hit by enemy ball
        this.respawnRobot();
    }
}
