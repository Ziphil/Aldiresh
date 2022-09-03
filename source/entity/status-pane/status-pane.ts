import {
  Engine,
  ScreenElement
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";
import {
  FIELD_CONFIGS
} from "/source/core/constant";
import {
  Status
} from "/source/entity/status";
import {
  StatusItem
} from "/source/entity/status-pane/status-item";


export class StatusPane extends ScreenElement {

  private status!: Status;
  private scoreStatusItem!: StatusItem;

  public constructor() {
    super({x: FIELD_CONFIGS.width, y: 0, z: -100});
  }

  public override onInitialize(engine: Engine): void {
    const scoreStatusItem = new StatusItem(0, 10);
    this.scoreStatusItem = scoreStatusItem;
    this.graphics.use(ASSETS.statusBackground.toSprite());
    this.addChild(scoreStatusItem);
  }

  public override onPostUpdate(engine: Engine, delta: number): void {
    this.scoreStatusItem.setNumber(this.status.score);
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}