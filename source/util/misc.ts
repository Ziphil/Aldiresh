//

import {
  Random
} from "excalibur";


export function tap<T>(self: T, callback: (value: T) => void): T {
  callback(self);
  return self;
}

export function randomize(random: Random, value: number): number {
  return random.integer(value / 2, value * 3 / 2);
}