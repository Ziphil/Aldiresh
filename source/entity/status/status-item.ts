//

import {
  Actor,
  CollisionType,
  Engine,
  Sprite,
  Text,
  vec
} from "excalibur";
import {
  ASSETS,
  SPRITE_FONTS,
  SPRITE_SHEETS
} from "/source/core/asset";


export type StatausItemConfigs = {
  x: number,
  y: number,
  spriteIndex: number,
  decimalLength?: number,
  getNumber: () => number
};


export class StatusItem extends Actor {

  private readonly spriteIndex: number;
  private readonly decimalLength?: number;
  private readonly getNumber: () => number;
  private frameSprite!: Sprite;
  private text!: Text;

  public constructor({x, y, ...configs}: StatausItemConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.spriteIndex = configs.spriteIndex;
    this.decimalLength = configs.decimalLength;
    this.getNumber = configs.getNumber;
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  public override onPostUpdate(engine: Engine, delta: number): void {
    this.updateNumber();
  }

  private initializeGraphics(): void {
    const frameSprite = ASSETS.statusFrame.toSprite();
    this.graphics.use(frameSprite);
    this.frameSprite = frameSprite;
    const text = new Text({text: "", font: SPRITE_FONTS.char});
    this.graphics.layers.create({name: "string", order: 1});
    this.graphics.layers.get("string").use(text);
    this.text = text;
    const nameSprite = SPRITE_SHEETS.statusName.sprites[this.spriteIndex];
    this.graphics.layers.create({name: "name", order: 1, offset: vec(8, 15 - nameSprite.height)});
    this.graphics.layers.get("name").use(nameSprite);
  }

  private updateNumber(): void {
    this.text.text = formatString(this.getNumber(), this.decimalLength);
    this.graphics.layers.get("string").offset = vec(this.frameSprite.width - this.text.width - 24, 4);
  }

}


function formatString(string: string | number, decimalLength?: number): string {
  if (typeof string === "number") {
    return string.toFixed(decimalLength ?? 0);
  } else {
    return string;
  }
}