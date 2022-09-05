//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  InputManagerComponent
} from "/source/component";
import {
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  Image
} from "/source/entity/image";
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
  spriteIndex: number
};


export class Button extends Actor {

  private readonly spriteIndex: number;
  private hovered: boolean;
  private target!: Target;

  public constructor({x, y, ...configs}: ButtonConfigs) {
    super({
      pos: vec(x, y),
      width: 144,
      height: 18,
      collisionType: CollisionType["Passive"]
    });
    this.spriteIndex = configs.spriteIndex;
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
    const stringImage = new Image({x: 0, y: 0, graphic: SPRITE_SHEETS.string.sprites[this.spriteIndex]});
    this.addChild(stringImage);
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