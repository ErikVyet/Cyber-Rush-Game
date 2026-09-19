
export const TIME_MULTIPLIER = 1;

// Road's constant properties
export const MIN_X = -1;
export const MAX_X = 1;
export const LANE_WIDTH = 2;

// Spaceship's constant properties
export const MAX_TRAVEL_SPEED = 15;
export const ACCELERATE_SPEED = 2;
export const ROLL_FACTOR = Math.PI / 12;
export const LANE_LAMBDA = 2;
export const ROLL_LAMBDA = 6;

// Laser beam's constant properties
export const LASER_BEAM_WIDTH = 0.02;
export const LASER_BEAM_HEIGHT = 0.02;
export const LASER_BEAM_DEPTH = 0.5;
export const LASER_BEAM_MAX_TRAVEL_DISTANCE = 40;
export const LASER_BEAM_TRAVEL_SPEED = MAX_TRAVEL_SPEED + 6 * LASER_BEAM_MAX_TRAVEL_DISTANCE;

// Coin's constant properties
export const COIN_LAMBDA = 2;
export const COIN_SPIN_SPEED = 1 / 100;
export const COIN_X_GAP = 1;
export const COIN_CLUSTER_GAP = 30;
export const COIN_CLUSTER_SIZE = 18;
export const COIN_PATTERNS = [
    // 0 = Empty, 1 = Coin
    [ // Left lane
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
    ],
    [ // Middle lane
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [ // Right lane
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [ // All lanes
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    [ // A
        [0, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1]
    ],
    [ // B
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 0]
    ],
    [ // V
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
    ]
];