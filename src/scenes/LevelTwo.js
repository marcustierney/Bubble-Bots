class LevelTwo extends Phaser.Scene {
    constructor() {
        super('LevelTwoScene')
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
        this.highScore2 = this.registry.get('highScore2') || 0
    }

    create() {
        // Score Display
        this.scoreText = this.add.text(260, 10, `${this.score}`, {
            fontSize: '14px',
            fill: '#ffffff'
        }).setScrollFactor(0).setDepth(10)
        
        // High Score Display
        this.highScore2Text = this.add.bitmapText(100, 10, 'score-font', `HI SCORE-${this.highScore2}`, 18).setScrollFactor(0).setDepth(10); // Align to the right

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
        const map = this.add.tilemap('tilemap2JSON')
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

        const Enemy4Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy4Spawn')
        const Enemy5Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy5Spawn')
        const Enemy6Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy6Spawn')
        const Enemy7Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy7Spawn')
        const Enemy9Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy9Spawn')
        const Enemy10Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy10Spawn')
        const Enemy11Spawn = map.findObject('Spawns', (obj) => obj.name === 'Enemy11Spawn')
        const Platform1Spawn = map.findObject('Platforms', (obj) => obj.name === 'Platform1')
        const Platform2Spawn = map.findObject('Platforms', (obj) => obj.name === 'Platform2')
        
        // Add robot
        this.robot = this.physics.add.sprite(30, 315, 'robot-sheet', 0).setScale(.9)
        this.robot.body.setSize(18,50)
        this.robot.body.setCollideWorldBounds(true)
        this.robot.body.setGravityY(this.GRAVITY) // Apply gravity
        this.robot.body.setMaxVelocity(this.VEL, 400) // Max speed
        this.robot.body.setDamping(true) // Enable damping

        // Apply strong drag to stop movement faster
        this.robot.body.setDragX(this.DRAG)

        //Enemy4
        this.enemy4 = this.physics.add.sprite(Enemy4Spawn.x, Enemy4Spawn.y, 'enemy-left', 0).setScale(.55)
        this.enemy4.body.setSize(63,70)
        this.enemy4.body.setOffset(0,0)
        this.enemy4.body.setCollideWorldBounds(true)
        this.enemy4.body.setGravityY(this.GRAVITY)
        this.enemy4.body.setVelocityX(25)

        //Enemy5
        this.enemy5 = this.physics.add.sprite(Enemy5Spawn.x, Enemy5Spawn.y, 'enemy-left', 0).setScale(.55)
        this.enemy5.body.setSize(63,70);
        this.enemy5.body.setOffset(0, 0);
        this.enemy5.body.setCollideWorldBounds(true);
        this.enemy5.body.setGravityY(this.GRAVITY);
        this.enemy5.body.setVelocityX(25)

        //Enemy6
        this.enemy6 = this.physics.add.sprite(Enemy6Spawn.x, Enemy6Spawn.y, 'enemy-left', 0).setScale(.5)
        this.enemy6.body.setSize(63,70);
        this.enemy6.body.setOffset(0, 0);
        this.enemy6.body.setCollideWorldBounds(true);
        this.enemy6.body.setGravityY(this.GRAVITY);
        this.enemy6.body.setVelocityX(25)

        this.enemy6ShootTimer = this.time.addEvent({
            delay: 3000, // Every 3 seconds
            callback: () => this.shootEnemyBalls(this.enemy6),
            callbackScope: this,
            loop: true
        });

        //Enemy7
        this.enemy7 = this.physics.add.sprite(Enemy7Spawn.x, Enemy7Spawn.y, 'enemy-left', 0).setScale(.5)
        this.enemy7.body.setSize(63,70);
        this.enemy7.body.setOffset(0, 0);
        this.enemy7.body.setCollideWorldBounds(true);
        this.enemy7.body.setGravityY(this.GRAVITY);
        this.enemy7.body.setVelocityX(25)

        //Enemy9
        this.enemy9 = this.physics.add.sprite(Enemy9Spawn.x, Enemy9Spawn.y, 'enemy-left', 0).setScale(.5)
        this.enemy9.body.setSize(63,70);
        this.enemy9.body.setOffset(0, 0);
        this.enemy9.body.setCollideWorldBounds(true)
        this.enemy9.body.setVelocityY(100)

        //Enemy10
        this.enemy10 = this.physics.add.sprite(Enemy10Spawn.x, Enemy10Spawn.y, 'enemy-left', 0).setScale(.5)
        this.enemy10.body.setSize(63,70);
        this.enemy10.body.setOffset(0, 0);
        this.enemy10.body.setCollideWorldBounds(true);
        this.enemy10.body.setGravityY(this.GRAVITY);
        this.enemy10.body.setVelocityX(50)

        this.enemy10ShootTimer = this.time.addEvent({
            delay: 3000, // Every 3 seconds
            callback: () => this.shootEnemyBalls(this.enemy10),
            callbackScope: this,
            loop: true
        });

        //Enemy11
        this.enemy11 = this.physics.add.sprite(Enemy11Spawn.x, Enemy11Spawn.y, 'enemy-left', 0).setScale(.5)
        this.enemy11.body.setSize(63,70);
        this.enemy11.body.setOffset(0, 0);
        this.enemy11.body.setCollideWorldBounds(true);
        this.enemy11.body.setGravityY(this.GRAVITY);
        this.enemy11.body.setVelocityX(25)

        // Platform1
        this.platform1 = this.physics.add.sprite(Platform1Spawn.x, Platform1Spawn.y, 'platform').setScale(.3);
        this.platform1.body.setImmovable(true)
        this.platform1.body.setAllowGravity(false)
        this.platform1.body.setVelocityX(50)        

        //Platform2
        this.platform2 = this.physics.add.sprite(Platform2Spawn.x, Platform2Spawn.y, 'platform').setScale(.3);
        this.platform2.body.setImmovable(true)
        this.platform2.body.setAllowGravity(false)
        this.platform2.body.setVelocityX(50)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.robot, true, 0.25, 0.25)

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.physics.add.collider(this.robot, terrain)
        this.physics.add.collider(this.robot, lava, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, door, this.levelComplete, null, this)
        this.physics.add.collider(this.enemy4, terrain)
        this.physics.add.collider(this.enemy5, terrain)
        this.physics.add.collider(this.enemy6, terrain)
        this.physics.add.collider(this.enemy7, terrain)
        this.physics.add.collider(this.enemy9, terrain)
        this.physics.add.collider(this.enemy10, terrain)
        this.physics.add.collider(this.enemy11, terrain)
        this.physics.add.collider(this.robot, this.platform1)
        this.physics.add.collider(this.robot, this.platform2)
        this.physics.add.collider(this.robot, this.enemy4, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy5, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy6, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy7, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy9, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy10, this.respawnRobot, null, this)
        this.physics.add.collider(this.robot, this.enemy11, this.respawnRobot, null, this)
        this.physics.add.collider(this.enemy4, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy5, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy6, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy7, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy10, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy11, paths, this.enemyMovement, null, this)
        this.physics.add.collider(this.enemy4, paths, () => {
            this.enemyMovement(this.enemy4);
        });
        this.physics.add.collider(this.enemy5, paths, () => {
            this.enemyMovement(this.enemy5);
        }); 
        this.physics.add.collider(this.enemy6, paths, () => {
            this.enemyMovement(this.enemy6);
        });
        this.physics.add.collider(this.enemy7, paths, () => {
            this.enemyMovement(this.enemy7);
        });
        this.physics.add.collider(this.enemy9, paths, () => {
            this.flyingEnemyMovement(this.enemy9);
        });
        this.physics.add.collider(this.enemy10, paths, () => {
            this.enemyMovement(this.enemy10);
        });
        this.physics.add.collider(this.enemy11, paths, () => {
            this.enemyMovement(this.enemy11);
        });
        this.physics.add.collider(this.platform1, paths, () => {
            this.platformMovement(this.platform1)
        });
        this.physics.add.collider(this.platform2, paths, () => {
            this.platformMovement(this.platform2)
        });

        // Input
        this.cursors = this.input.keyboard.createCursorKeys()
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.balls = this.physics.add.group()
        this.physics.add.collider(this.balls, terrain, (ball) => ball.destroy())

        this.physics.add.collider(this.balls, this.enemy4, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy5, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy6, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy7, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy9, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy10, this.enemyHit, null, this)
        this.physics.add.collider(this.balls, this.enemy11, this.enemyHit, null, this)
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

        if (this.enemy6.active === false) { // Check if enemy is destroyed 
            this.enemy6ShootTimer.remove()
        }
        if (this.enemy10.active === false) { // Check if enemy is destroyed 
            this.enemy10ShootTimer.remove()
        }
    }

    respawnRobot() {
        this.score = this.startingScore; // Reset score on death
        this.backgroundMusic.stop()
        this.splashMusic.play()
        this.splashMusicPlaying = true;
        this.scene.start('over2Scene')
    }

    levelComplete() {
        // Update the high score if the current score is higher
        if (this.score > this.highScore2) {
            this.highScore2 = this.score;
            this.registry.set('highScore2', this.highScore2); // Store the new high score
            this.highScore2Text.setText(`HI SCORE-${this.highScore2}`);
        }
        this.registry.set('finalScore', this.score);
        this.scene.start('complete2Scene')
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

   flyingEnemyMovement(enemy) {
    /*if (this.EVEL > 0) {
        enemy.setTexture('enemy-up)
    }
    else if (this.EVEL < 0) {
        enemy.setTexture('enemy-down')
    }*/
    this.EVEL = -this.EVEL
    enemy.body.setVelocityY(this.EVEL)  
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
    shootEnemyBalls(enemy) {
        // Shoot a ball to the right
        let ballRight = this.balls.create(enemy.x, enemy.y, 'ball-enemy').setScale(0.2);
        ballRight.body.setCollideWorldBounds(true);
        ballRight.body.setSize(50, 50);
        ballRight.body.allowGravity = false;
        ballRight.setVelocityX(150); 
        ballRight.startX = enemy.x;
        // Shoot a ball to the left
        let ballLeft = this.balls.create(enemy.x, enemy.y, 'ball-enemy').setScale(0.2);
        ballLeft.body.setCollideWorldBounds(true);
        ballLeft.body.setSize(50, 50);
        ballLeft.body.allowGravity = false;
        ballLeft.setVelocityX(-150); 
        ballLeft.startX = enemy.x
    }
    robotHit() { //If player is hit by enemy ball
        this.respawnRobot();
    }
    platformMovement(platform) {
        this.EVEL = -this.EVEL
        platform.body.setVelocityX(this.EVEL)  
   }
}