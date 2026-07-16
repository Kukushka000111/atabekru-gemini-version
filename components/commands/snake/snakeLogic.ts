export const GRID_SIZE = 20;
export const CELL_SIZE = 14;
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
export const TICK_MS = 130;

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface Point {
  x: number;
  y: number;
}

export const OPPOSITE: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

export function pointsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export function isOnSnake(snake: Point[], point: Point): boolean {
  return snake.some((segment) => pointsEqual(segment, point));
}

export function spawnFood(snake: Point[]): Point {
  let food: Point;
  let attempts = 0;

  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    attempts++;
  } while (isOnSnake(snake, food) && attempts < 500);

  return food;
}

export function getNextHead(head: Point, direction: Direction): Point {
  switch (direction) {
    case "UP":
      return { x: head.x, y: head.y - 1 };
    case "DOWN":
      return { x: head.x, y: head.y + 1 };
    case "LEFT":
      return { x: head.x - 1, y: head.y };
    case "RIGHT":
      return { x: head.x + 1, y: head.y };
  }
}

export function isOutOfBounds(point: Point): boolean {
  return (
    point.x < 0 ||
    point.x >= GRID_SIZE ||
    point.y < 0 ||
    point.y >= GRID_SIZE
  );
}

export function createInitialState() {
  const snake: Point[] = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];

  return {
    snake,
    direction: "RIGHT" as Direction,
    nextDirection: "RIGHT" as Direction,
    food: spawnFood(snake),
    score: 0,
    isGameOver: false,
  };
}

export type GameState = ReturnType<typeof createInitialState>;

export function stepGame(state: GameState): GameState {
  if (state.isGameOver) return state;

  const direction = state.nextDirection;
  const head = getNextHead(state.snake[0], direction);
  const ateFood = pointsEqual(head, state.food);

  if (isOutOfBounds(head)) {
    return { ...state, direction, isGameOver: true };
  }

  const bodyToCheck = ateFood ? state.snake : state.snake.slice(0, -1);
  if (bodyToCheck.some((segment) => pointsEqual(segment, head))) {
    return { ...state, direction, isGameOver: true };
  }

  const newSnake = [head, ...state.snake];
  if (!ateFood) {
    newSnake.pop();
  }

  const food = ateFood ? spawnFood(newSnake) : state.food;
  const score = ateFood ? state.score + 1 : state.score;

  return {
    snake: newSnake,
    direction,
    nextDirection: direction,
    food,
    score,
    isGameOver: false,
  };
}
