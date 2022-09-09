//

import {
  Actor,
  CollisionType,
  Engine,
  Text,
  Vector,
  vec
} from "excalibur";
import {
  SPRITE_FONTS
} from "/source/core/asset";
import {
  DEPTHS
} from "/source/core/constant";


export type StatusNumberLabelConfigs = {
  x: number,
  y: number,
  anchor?: Vector,
  value?: string | number,
  decimalLength?: number
};


export class StringLabel extends Actor {

  private readonly initialString: string;
  private readonly decimalLength: number;
  private text!: Text;

  public constructor({x, y, ...configs}: StatusNumberLabelConfigs) {
    super({
      pos: vec(x, y),
      anchor: configs.anchor ?? vec(1, 0.5),
      z: DEPTHS.button,
      collisionType: CollisionType["PreventCollision"]
    });
    this.decimalLength = configs.decimalLength ?? 0;
    this.initialString = formatValue(configs.value ?? "", configs.decimalLength);
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
  }

  private initializeGraphics(): void {
    const text = new Text({text: this.initialString, font: SPRITE_FONTS.char});
    this.text = text;
    this.graphics.use(text);
  }

  public set value(value: string | number) {
    const formattedString = formatValue(value, this.decimalLength);
    this.text.text = formattedString;
  }

}


function formatValue(value: string | number, decimalLength?: number): string {
  if (typeof value === "number") {
    return value.toFixed(decimalLength ?? 0);
  } else {
    return value;
  }
}