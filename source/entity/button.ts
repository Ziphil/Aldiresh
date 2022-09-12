//

import {
  Actor,
  CollisionType,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  InputComponent
} from "/source/component";
import {
  SPRITE_FONTS,
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  DEPTHS
} from "/source/core/constant";
import {
  Target
} from "/source/entity/main/target";


export type ButtonConfigs = {
  x: number,
  y: number,
  string: string,
  length: number,
  onPress: () => void
};


export class Button extends Actor {

  private readonly string: string;
  private readonly length: number;
  private readonly onPress: () => void;
  private hovered: boolean;
  public target!: Target;

  public constructor({x, y, ...configs}: ButtonConfigs) {
    super({
      pos: vec(x, y),
      z: DEPTHS.button,
      collisionType: CollisionType["Passive"]
    });
    this.string = configs.string;
    this.length = configs.length;
    this.onPress = configs.onPress;
    this.hovered = false;
  }

  public override onInitialize(engine: Engine): void {
    this.initializeGraphics();
    this.initializeCollider();
    this.initializeComponents(engine);
    this.target = engine.currentScene.world.entityManager.getByName("target")[0] as Target;
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.updateHovered();
    this.press();
  }

  private initializeGraphics(): void {
    this.graphics.add("default", SPRITE_SHEETS.buttonFrame.sprites[this.length * 3 - 2]);
    this.graphics.add("hovered", SPRITE_SHEETS.buttonFrame.sprites[this.length * 3 - 1]);
    this.graphics.use("default");
    const text = new Text({text: this.string, font: SPRITE_FONTS.char});
    this.graphics.layers.create({name: "string", order: 1});
    this.graphics.layers.get("string").use(text);
  }

  private initializeCollider(): void {
    const {width, height} = SPRITE_SHEETS.buttonFrame.sprites[this.length * 3 - 2];
    this.collider.usePolygonCollider([
      vec(-width / 2 + height + 1, -height / 2 + 1),
      vec(width / 2 - 1, -height / 2 + 1),
      vec(width / 2 - height - 1, height / 2 - 1),
      vec(-width / 2 + 1, height / 2 - 1)
    ], vec(1, 1));
  }

  private initializeComponents(engine: Engine): void {
    const inputComponent = new InputComponent();
    this.addComponent(inputComponent);
  }

  private updateHovered(): void {
    const contacts = this.collider.collide(this.target.collider);
    if (contacts.length > 0) {
      this.graphics.use("hovered");
      this.hovered = true;
    } else {
      this.graphics.use("default");
      this.hovered = false;
    }
  }

  private press(): void {
    const input = this.get(InputComponent)!;
    if (this.hovered && input.buttonPressed) {
      this.onPress();
    }
  }

}