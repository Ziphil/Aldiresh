//

import {
  Engine,
  ScreenElement
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";
import {
  FIELD_PROPS
} from "/source/core/constant";
import {
  Status
} from "/source/entity/status";
import {
  StatusItem
} from "/source/entity/status-pane/status-item";


export class StatusPane extends ScreenElement {

  private status!: Status;

  public constructor() {
    super({x: FIELD_PROPS.width, y: 0, z: -100});
  }

  public override onInitialize(engine: Engine): void {
    const scoreStatusItem = new StatusItem({x: 0, y: 10, spriteIndex: 0, getNumber: () => this.status.score});
    const levelStatusItem = new StatusItem({x: 0, y: 40, spriteIndex: 1, getNumber: () => this.status.level});
    const lifeStatusItem = new StatusItem({x: 0, y: 64, spriteIndex: 2, getNumber: () => this.status.life});
    const hitCountStatusItem = new StatusItem({x: 0, y: 94, spriteIndex: 3, getNumber: () => this.status.hitCount});
    const killCountStatusItem = new StatusItem({x: 0, y: 118, spriteIndex: 4, getNumber: () => this.status.killCount});
    this.graphics.use(ASSETS.statusBackground.toSprite());
    this.addChild(scoreStatusItem);
    this.addChild(levelStatusItem);
    this.addChild(lifeStatusItem);
    this.addChild(hitCountStatusItem);
    this.addChild(killCountStatusItem);
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}