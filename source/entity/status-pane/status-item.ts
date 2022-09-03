//

import {
  Actor,
  Engine,
  vec
} from "excalibur";
import {
  ASSETS,
  SPRITE_FONTS,
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  FIELD_PROPS,
  SCREEN_PROPS
} from "/source/core/constant";
import {
  NumberLabel
} from "/source/entity/number-label";


export type StatausItemConfigs = {
  x: number,
  y: number,
  spriteIndex: number,
  getNumber: () => number
};


export class StatusItem extends Actor {

  private readonly spriteIndex: number;
  private readonly getNumber: () => number;
  private numberLabel!: NumberLabel;

  public constructor({x, y, ...configs}: StatausItemConfigs) {
    super({x, y, z: -90});
    this.spriteIndex = configs.spriteIndex;
    this.getNumber = configs.getNumber;
    this.anchor = vec(0, 0);
  }

  public override onInitialize(engine: Engine): void {
    const numberLabel = new NumberLabel({x: SCREEN_PROPS.width - FIELD_PROPS.width - 22, y: 9, font: SPRITE_FONTS.number, align: "right"});
    const nameEntity = new Actor({x: 8, y: 2});
    nameEntity.anchor = vec(0, 0);
    nameEntity.graphics.use(SPRITE_SHEETS.statusName.sprites[this.spriteIndex]);
    this.numberLabel = numberLabel;
    this.graphics.use(ASSETS.statusFrame.toSprite());
    this.addChild(numberLabel);
    this.addChild(nameEntity);
  }

  public override onPostUpdate(engine: Engine, delta: number): void {
    this.numberLabel.setNumber(this.getNumber());
  }

}