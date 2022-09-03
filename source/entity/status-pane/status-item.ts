import {
  Actor,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  ASSETS, SPRITE_FONTS
} from "/source/core/asset";
import {
  FIELD_CONFIGS,
  SCREEN_CONFIGS
} from "/source/core/constant";


export class StatusItem extends Actor {

  private numberLabel!: NumberLabel;

  public constructor(x: number, y: number) {
    super({x, y, z: -90});
    this.anchor = vec(0, 0);
  }

  public override onInitialize(engine: Engine): void {
    const numberLabel = new NumberLabel(SCREEN_CONFIGS.width - FIELD_CONFIGS.width - 22, 4);
    numberLabel.anchor = vec(1, 0);
    this.numberLabel = numberLabel;
    this.graphics.use(ASSETS.statusFrame.toSprite());
    this.addChild(numberLabel);
  }

  public setNumber(number: number): void {
    this.numberLabel.setNumber(number);
  }

}


export class NumberLabel extends Actor {

  private text!: Text;

  public constructor(x: number, y: number) {
    super({x, y, z: -90});
  }

  public override onInitialize(engine: Engine): void {
    const text = new Text({text: "", font: SPRITE_FONTS.number});
    this.text = text;
    this.graphics.use(text);
  }

  public setNumber(number: number): void {
    this.text.text = number.toFixed(0);
  }

}
