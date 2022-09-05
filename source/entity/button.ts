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


export const STATUS_PROPS = {
  levelInterval: 15000,
  maxLevel: 49,
  initialLife: 5,
  comboDuration: 3000,
  maxCombo: 30
};

export type ButtonConfigs = {
  x: number,
  y: number,
  string: string
};


export class Button extends Actor {

  private readonly string: string;
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
    this.graphics.add("default", SPRITE_SHEETS.button.sprites[0]);
    this.graphics.add("hovered", SPRITE_SHEETS.button.sprites[1]);
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
      engine.goToScene("main");
    }
  }

}