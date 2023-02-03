export enum Events {
  CLICK = "click",
  KEYUP = "keyup",
  KEYDOWN = "keydown",
}

export type EventHandler = {
  event: Events;
  handler: ((event: MouseEvent) => void) | ((event: KeyboardEvent) => void);
};

// A game that is consumed by useCanvas has to adhere to this interface
export interface CanvasGame {
  draw(): void;
  animationId?: number;
  eventListeners: EventHandler[];
}
