//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {SPRITE_SHEETS} from "/source/core/asset";
import {Image} from "/source/entity/image";


export const STATUS_PROPS = {
  levelInterval: 15000,
  maxLevel: 49,
  initialLife: 5,
  comboDuration: 3000,
  maxCombo: 30
};

export type ButtonConfigs = {
  x: number,
  y: number,
  spriteIndex: number
};


export class Button extends Actor {

  private readonly spriteIndex: number;

  public constructor({x, y, ...configs}: ButtonConfigs) {
    super({
      pos: vec(x, y),
      collisionType: CollisionType["Passive"]
    });
    this.spriteIndex = configs.spriteIndex;
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
  }

  private initializeGraphics(): void {
    this.graphics.add("default", SPRITE_SHEETS.button.sprites[0]);
    this.graphics.add("hover", SPRITE_SHEETS.button.sprites[1]);
    this.graphics.use("default");
    const stringImage = new Image({x: 0, y: 0, graphic: SPRITE_SHEETS.string.sprites[this.spriteIndex]});
    this.addChild(stringImage);
  }

}