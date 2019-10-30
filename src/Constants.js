export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const JUMP_RUMP = 'jumpRump';
export const SKIER_JUMP1 = 'jump1';
export const SKIER_JUMP2 = 'jump2';
export const SKIER_JUMP3 = 'jump3';
export const SKIER_JUMP4 = 'jump4';
export const SKIER_JUMP5 = 'jump5';
export const RHINO = 'rhinoDefault';
export const RHINO_EAT1 = 'rhinoEat1';
export const RHINO_EAT2 = 'rhinoEat2';
export const RHINO_EAT3 = 'rhinoEat3';
export const RHINO_EAT4 = 'rhinoEat4';
export const RHINO_OPEN_MOUTH = 'rhinoOpenMouth';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_RUN_LEFT = 'rhinoRunLeft';
export const RHINO_RUN_RIGHT = 'rhinoRunRight';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_JUMPING_SPEED = 12;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_JUMP_TIME = 800;
export const SKIER_SCORING_INTERVAL = 800;
export const TIME_TO_WAKE_UP_RHINO = (10 * 1000);
export const RHINO_SPEED = 8;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP1] : 'img/skier_jump_1.png',
    [SKIER_JUMP2] : 'img/skier_jump_2.png',
    [SKIER_JUMP3] : 'img/skier_jump_3.png',
    [SKIER_JUMP4] : 'img/skier_jump_4.png',
    [SKIER_JUMP5] : 'img/skier_jump_5.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [JUMP_RUMP] : 'img/jump_ramp.png',
    [RHINO] : 'img/rhino_default.png',
    [RHINO_OPEN_MOUTH] : 'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT] : 'img/rhino_lift.png',
    [RHINO_EAT1] : 'img/rhino_lift_eat_1.png',
    [RHINO_EAT2] : 'img/rhino_lift_eat_2.png',
    [RHINO_EAT3] : 'img/rhino_lift_eat_3.png',
    [RHINO_EAT4] : 'img/rhino_lift_eat_4.png',
    [RHINO_RUN_LEFT] : 'img/rhino_run_left.png',
    [RHINO_RUN_RIGHT] : 'img/rhino_run_right.png'
};


export const RHINO_RUN = {
    RHINO_RUN_LEFT : 0,
    RHINO_RUN_RIGHT : 1
}

export const RHINO_RUN_ASSET = {
    [RHINO_RUN.RHINO_RUN_LEFT] : RHINO_RUN_LEFT,
    [RHINO_RUN.RHINO_RUN_RIGHT] : RHINO_RUN_RIGHT
}

export const RHINO_EAT = {
    OPEN_MOUTH : 0,
    LIFT : 1,
    EAT1: 2,
    EAT2: 3,
    EAT3 : 4,
    EAT4 : 5
}

export const RHINO_EAT_ASSET = {
    [RHINO_EAT.OPEN_MOUTH] : RHINO_OPEN_MOUTH,
    [RHINO_EAT.LIFT] : RHINO_LIFT,
    [RHINO_EAT.EAT1] : RHINO_EAT1,
    [RHINO_EAT.EAT2] : RHINO_EAT2,
    [RHINO_EAT.EAT3] : RHINO_EAT3,
    [RHINO_EAT.EAT4] : RHINO_EAT4,
}

export const SKIER_DIRECTIONS = {
    CRASH : 0,
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_JUMPING = {
    JUMP1 : 0,
    JUMP2 : 1,
    JUMP3 : 2,
    JUMP4 : 3,
    JUMP5 : 4
};

export const SKIER_JUMPING_ASSET = {
    [SKIER_JUMPING.JUMP1] : SKIER_JUMP1,
    [SKIER_JUMPING.JUMP2] : SKIER_JUMP2,
    [SKIER_JUMPING.JUMP3] : SKIER_JUMP3,
    [SKIER_JUMPING.JUMP4] : SKIER_JUMP4,
    [SKIER_JUMPING.JUMP5] : SKIER_JUMP5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH] : SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    SHIFT: 16,
    SPACE: 32
};