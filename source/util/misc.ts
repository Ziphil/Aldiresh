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

export function downloadImage(imageElement: HTMLImageElement, name: string): void {
  const canvas = document.createElement("canvas") ;
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  const context = canvas.getContext("2d")!;
  context.drawImage(imageElement, 0, 0);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = name;
  link.click();
}