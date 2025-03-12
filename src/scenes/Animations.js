export function createPlayerAnimations(scene) {
    scene.anims.create({
        key: 'walk-right',
        frameRate: 10, 
        repeat: -1,
        frames: scene.anims.generateFrameNames('robot-sheet', {
            start: 0,
            end: 3
        })
    });
    scene.anims.create({
        key: 'walk-left',
        frameRate: 10, 
        repeat: -1,
        frames: scene.anims.generateFrameNames('robot-sheet', {
            start: 4,
            end: 7
        })
    });
    scene.anims.create({
        key: 'idle-left',
        frameRate: 10, 
        repeat: -1,
        frames: scene.anims.generateFrameNames('robot-sheet', {
            start: 7,
            end: 7
        })
    });
    scene.anims.create({
        key: 'idle-right',
        frameRate: 10, 
        repeat: -1,
        frames: scene.anims.generateFrameNames('robot-sheet', {
            start: 0,
            end: 0
        })
    });
    scene.anims.create({
        key: 'shoot-right',
        frameRate: 1, 
        repeat: 0,
        frames: scene.anims.generateFrameNames('robot-sheet', {
            start: 1,
            end: 1
        })
    });
    scene.anims.create({
        key: 'shoot-left',
        frameRate: 10, 
        repeat: 0,
        frames: scene.anims.generateFrameNames('robot-sheet', {
            start: 6,
            end: 6
        })
    });
}

export function createEnemyAnimations(scene) {
    scene.anims.create({
        key: 'enemy-move-left',
        frames: [{ key: 'enemy-left' }],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'enemy-move-right',
        frames: [{ key: 'enemy-right' }],
        frameRate: 10,
        repeat: -1
    });
}
