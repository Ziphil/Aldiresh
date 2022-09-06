//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  StringLabel
} from "/source/entity/string-label";


export type RankingItemConfigs = {
  x: number,
  y: number,
  string?: string | number,
  length: number,
  decimalLength?: number
};


export class RankingItem extends Actor {

  private readonly length: number;
  private readonly decimalLength?: number;
  private readonly initialString?: string | number;
  private label!: StringLabel;

  public constructor({x, y, ...configs}: RankingItemConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.graphics.use(SPRITE_SHEETS.buttonFrame.sprites[configs.length * 2 - 2]);
    this.length = configs.length;
    this.initialString = configs.string;
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren();
  }

  private addChildren(): void {
    const label = new StringLabel({x: this.length * 13 + 19, y: 8, string: this.initialString, decimalLength: this.decimalLength});
    this.label = label;
    this.addChild(label);
  }

  public set string(string: string | number) {
    this.label.string = string;
  }

}