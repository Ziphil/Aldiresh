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
    this.addNumberLabel();
    this.addNameEntity();
  }

  public override onPostUpdate(engine: Engine, delta: number): void {
    this.updateNumber();
  }

  private addNumberLabel(): void {
    const numberLabel = new StatusNumberLabel({x: SCREEN_PROPS.width - FIELD_PROPS.width - 22, y: 9, decimalLength: this.decimalLength});
    this.numberLabel = numberLabel;
    this.addChild(numberLabel);
  }

  private addNameEntity(): void {
    const nameEntity = new Actor({x: 8, y: 2, anchor: vec(0, 0)});
    nameEntity.graphics.use(SPRITE_SHEETS.statusName.sprites[this.spriteIndex]);
    this.addChild(nameEntity);
  }

  private updateNumber(): void {
    this.numberLabel.number = this.getNumber();
  }

}