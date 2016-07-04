export const DELAY = 40;
export const DEFAULT_GAME_SIZE = 6;
export const DEFAULT_GAME_WIDTH = 500;
export const DEFAULT_GAME_HEIGHT = 500;

export const STATUSES = {
  DEAD: 0,
  BORN: 1,
  ALIVE: 2,
  PROSPER: 3,
  CORPSE: 4
}

export const FILLS = {
  [STATUSES.DEAD]: '#fff',
  [STATUSES.BORN]: '#FFB0D5',
  [STATUSES.ALIVE]: '#4AFF83',
  [STATUSES.PROSPER]: '#FF8300',
  [STATUSES.CORPSE]: '#1C345F'
}