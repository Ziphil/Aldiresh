//

import {
  Actor,
  CollisionType,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  InputManagerComponent
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
} from "/source/entity/target";


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
  private target!: Target;

  public constructor({x, y, ...configs}: ButtonConfigs) {
    super({
      pos: vec(x, y),
      width: 144,
      height: 18,
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
    this.initializeComponents(engine);
    this.target = engine.currentScene.world.entityManager.getByName("target")[0] as Target;
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    const contacts = this.collider.collide(this.target.collider);
    if (contacts.length > 0) {
      this.graphics.use("hovered");
      this.hovered = true;
    } else {
      this.graphics.use("default");
      this.hovered = false;
    }
  }

  private initializeGraphics(): void {
    this.graphics.add("default", SPRITE_SHEETS.buttonFrame.sprites[this.length * 2 - 2]);
    this.graphics.add("hovered", SPRITE_SHEETS.buttonFrame.sprites[this.length * 2 - 1]);
    this.graphics.use("default");
    const text = new Text({text: this.string, font: SPRITE_FONTS.char});
    this.graphics.layers.create({name: "string", order: 1});
    this.graphics.layers.get("string").use(text);
  }

  private initializeComponents(engine: Engine): void {
    const inputComponent = new InputManagerComponent();
    inputComponent.setOnButtonDown(() => this.press(engine));
    this.addComponent(inputComponent);
  }

  private press(engine: Engine): void {
    if (this.hovered) {
      this.onPress();
    }
  }

}