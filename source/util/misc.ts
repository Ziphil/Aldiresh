//

import {
  Engine
} from "excalibur";


export function tap<T>(self: T, callback: (value: T) => void): T {
  callback(self);
  return self;
}

export function reschedule(engine: Engine, callback: () => number, timeout: number): void {
  engine.clock.schedule(() => {
    const nextTimeout = callback();
    reschedule(engine, callback, nextTimeout);
  }, timeout);
}