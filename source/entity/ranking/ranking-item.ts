//

import {
  Actor,
  CollisionType,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  SPRITE_FONTS,
  SPRITE_SHEETS
} from "/source/core/asset";


export type RankingItemConfigs = {
  x: number,
  y: number,
  string?: string | number,
  length: number
};


export class RankingItem extends Actor {

  private readonly length: number;
  private readonly initialString?: string | number;
  private text!: Text;

  public constructor({x, y, ...configs}: RankingItemConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.graphics.use(SPRITE_SHEETS.buttonFrame.sprites[configs.length * 3 - 3]);
    this.length = configs.length;
    this.initialString = configs.string;
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  private initializeGraphics(): void {
    const frameSprite = SPRITE_SHEETS.buttonFrame.sprites[this.length * 3 - 3];
    this.graphics.use(frameSprite);
    const string = this.initialString?.toString() ?? "";
    const text = new Text({text: string, font: SPRITE_FONTS.char});
    this.graphics.layers.create({name: "string", order: 1, offset: vec(frameSprite.width - text.width - 18, 4)});
    this.graphics.layers.get("string").use(text);
    this.text = text;
  }

  public set string(string: string | number) {
    this.text.text = string.toString();
  }

}