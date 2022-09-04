//

import {
  Actor,
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
    super({x, y, z: -90});
    this.spriteIndex = configs.spriteIndex;
    this.decimalLength = configs.decimalLength;
    this.getNumber = configs.getNumber;
    this.anchor = vec(0, 0);
  }

  public override onInitialize(engine: Engine): void {
    const numberLabel = new StatusNumberLabel({x: SCREEN_PROPS.width - FIELD_PROPS.width - 22, y: 9, decimalLength: this.decimalLength});
    const nameEntity = new Actor({x: 8, y: 2});
    nameEntity.anchor = vec(0, 0);
    nameEntity.graphics.use(SPRITE_SHEETS.statusName.sprites[this.spriteIndex]);
    this.numberLabel = numberLabel;
    this.graphics.use(ASSETS.statusFrame.toSprite());
    this.addChild(numberLabel);
    this.addChild(nameEntity);
  }

  public override onPostUpdate(engine: Engine, delta: number): void {
    this.numberLabel.number = this.getNumber();
  }

}