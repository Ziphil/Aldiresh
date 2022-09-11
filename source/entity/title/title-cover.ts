//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  vec
} from "excalibur";
import {ASSETS} from "/source/core/asset";
import {
  DEPTHS,
  SCREEN_DIMENSION
} from "/source/core/constant";
import {
  Button
} from "/source/entity/button";
import {Image} from "/source/entity/image";
import {
  Status
} from "/source/entity/main/status";


export class TitleCover extends Actor {

  private instructionSetup: boolean;
  public status!: Status;

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.cover,
      width: SCREEN_DIMENSION.width,
      height: SCREEN_DIMENSION.height,
      collisionType: CollisionType["PreventCollision"],
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
    this.instructionSetup = false;
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren(engine);
    this.setupInstruction();
  }

  private async addChildren(engine: Engine): Promise<void> {
    const logo = new Image({x: SCREEN_DIMENSION.width / 2, y: SCREEN_DIMENSION.height / 2 - 46, graphic: ASSETS.logo.toSprite()});
    const copyright = new Image({x: SCREEN_DIMENSION.width / 2, y: SCREEN_DIMENSION.height - 15, graphic: ASSETS.copyright.toSprite()});
    const mainButton = new Button({x: SCREEN_DIMENSION.width / 2, y: SCREEN_DIMENSION.height / 2 + 14, string: "Start", length: 8, onPress: () => engine.goToScene("main")});
    const rankingButton = new Button({x: SCREEN_DIMENSION.width / 2, y: SCREEN_DIMENSION.height / 2 + 38, string: "Ranking", length: 8, onPress: () => engine.goToScene("ranking")});
    const instructionButton = new Button({x: SCREEN_DIMENSION.width / 2, y: SCREEN_DIMENSION.height / 2 + 62, string: "How To", length: 8, onPress: () => this.showInstruction()});
    this.addChild(logo);
    this.addChild(copyright);
    this.addChild(mainButton);
    this.addChild(rankingButton);
    this.addChild(instructionButton);
  }

  private setupInstruction(): void {
    if (!this.instructionSetup) {
      const buttonElement = document.getElementById("button")!;
      buttonElement.addEventListener("click", () => {
        const instructionElement = document.getElementById("instruction-container")!;
        instructionElement.ariaHidden = "true";
      });
      this.instructionSetup = true;
    }
  }

  private showInstruction(): void {
    const instructionElement = document.getElementById("instruction-container")!;
    instructionElement.ariaHidden = "false";
  }

}