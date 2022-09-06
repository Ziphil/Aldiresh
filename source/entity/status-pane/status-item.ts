//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  ASSETS,
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  FIELD_PROPS,
  SCREEN_PROPS
} from "/source/core/constant";
import {
  Image
} from "/source/entity/image";
import {
  StatusNumberLabel
} from "/source/entity/status-pane/status-number-label";


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
  private numberLabel!: StatusNumberLabel;

  public constructor({x, y, ...configs}: StatausItemConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.spriteIndex = configs.spriteIndex;
    this.decimalLength = configs.decimalLength;
    this.getNumber = configs.getNumber;
    this.graphics.use(ASSETS.statusFrame.toSprite());
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren();
  }

  public override onPostUpdate(engine: Engine, delta: number): void {
    this.updateNumber();
  }

  private addChildren(): void {
    const numberLabel = new StatusNumberLabel({x: SCREEN_PROPS.width - FIELD_PROPS.width - 24, y: 8, decimalLength: this.decimalLength});
    const nameImage = new Image({x: 8, y: 2, anchor: vec(0, 0), graphic: SPRITE_SHEETS.statusName.sprites[this.spriteIndex]});
    this.numberLabel = numberLabel;
    this.addChild(numberLabel);
    this.addChild(nameImage);
  }

  private updateNumber(): void {
    this.numberLabel.number = this.getNumber();
  }

}