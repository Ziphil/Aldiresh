import {
  Actor,
  Engine,
  vec
} from "excalibur";
import {
  ASSETS,
  SPRITE_FONTS
} from "/source/core/asset";
import {
  FIELD_CONFIGS,
  SCREEN_CONFIGS
} from "/source/core/constant";
import {
  NumberLabel
} from "/source/entity/number-label";


export class StatusItem extends Actor {

  private numberLabel!: NumberLabel;

  public constructor({x, y}: {x: number, y: number}) {
    super({x, y, z: -90});
    this.anchor = vec(0, 0);
  }

  public override onInitialize(engine: Engine): void {
    const numberLabel = new NumberLabel({x: SCREEN_CONFIGS.width - FIELD_CONFIGS.width - 22, y: 9, font: SPRITE_FONTS.number, align: "right"});
    this.numberLabel = numberLabel;
    this.graphics.use(ASSETS.statusFrame.toSprite());
    this.addChild(numberLabel);
  }

  public setNumber(number: number): void {
    this.numberLabel.setNumber(number);
  }

}