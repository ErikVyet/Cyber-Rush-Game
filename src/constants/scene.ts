
export const TIME_MULTIPLIER = 1;

// Road's constant properties
export const MIN_X = -1;
export const MAX_X = 1;
export const LANE_WIDTH = 2;
export const ROAD_LENGTH = 10;
export const ROAD_COUNT = 70;

// Building's constant properties
export const BUILDING_COUNT = ROAD_COUNT - (2 * Math.ceil(ROAD_COUNT / 10));
export const BUILDING_GAP = 6.666;

// Spaceship's constant properties
export const MAX_HEIGHT = 8;
export const MAX_TRAVEL_SPEED = 15;
export const ACCELERATE_SPEED = 2;
export const ROLL_FACTOR = Math.PI / 12;
export const ROLL_X_LAMBDA = 6;
export const ROLL_Y_LAMBDA = 0.5;
export const LANE_LAMBDA = 2;

// Laser beam's constant properties
export const LASER_BEAM_WIDTH = 0.04;
export const LASER_BEAM_HEIGHT = 0.04;
export const LASER_BEAM_DEPTH = 0.5;
export const LASER_BEAM_MAX_TRAVEL_DISTANCE = 20;
export const LASER_BEAM_TRAVEL_SPEED = MAX_TRAVEL_SPEED / 8;
export const LASER_BEAM_BASE_DAMAGE = 25;

// Coin's constant properties
export const COIN_SPIN_SPEED = 1 / 100;

// Object's constant properties (objects include coin and powerup)
export const OBJECT_X_GAP = 1;
export const OBJECT_Z_GAP = 2;
export const OBJECT_LAMBDA = 2;
export const OBJECT_CLUSTER_GAP = 30;
export const OBJECT_CLUSTER_SIZE = 18;
export const OBJECT_PATTERNS = [
    // 0 = Empty, 1 = Coin, 2 = Power up
    [ // Left lane
        [1, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
    ],
    [ // Middle lane
        [0, 1, 0],
        [0, 1, 0],
        [0, 2, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [ // Right lane
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 2],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [ // All lanes
        [1, 1, 1],
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    [ // A
        [0, 1, 0],
        [1, 0, 1],
        [1, 2, 1],
        [1, 0, 1]
    ],
    [ // B
        [1, 1, 0],
        [1, 0, 1],
        [1, 2, 1],
        [1, 0, 1],
        [1, 1, 0]
    ],
    [ // V
        [1, 0, 1],
        [1, 0, 1],
        [0, 2, 0]
    ]
];

export const EXPLOSIVE_BARREL_MAX_HEALTH = 50;
export const EXPLOSIVE_BARREL_DAMAGE = 50;

export const WALL_MAX_HEALTH = 75;
export const WALL_DAMAGE = 30;

export const NPC_MAX_HEALTH = 100;
export const NPC_DAMAGE = 25;

export const MAX_OBSTACLE_COUNT = 18;
export const OBSTACLE_Z_GAP = 30;