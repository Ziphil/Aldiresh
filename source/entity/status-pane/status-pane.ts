//

import {
  Actor,
  Engine,
  vec
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";
import {
  FIELD_PROPS
} from "/source/core/constant";
import {
  STATUS_PROPS,
  Status
} from "/source/entity/status";
import {
  StatusItem
} from "/source/entity/status-pane/status-item";


export class StatusPane extends Actor {

  private status!: Status;

  public constructor() {
    super({x: FIELD_PROPS.width, y: 0, z: -100});
    this.anchor = vec(0, 0);
  }

  public override onInitialize(engine: Engine): void {
    const scoreItem = new StatusItem({x: 0, y: 10, spriteIndex: 0, getNumber: () => this.status.score});
    const levelItem = new StatusItem({x: 0, y: 40, spriteIndex: 1, getNumber: () => this.status.level + 1});
    const lifeItem = new StatusItem({x: 0, y: 64, spriteIndex: 2, getNumber: () => this.status.life});
    const hitCountItem = new StatusItem({x: 0, y: 94, spriteIndex: 3, getNumber: () => this.status.hitCount});
    const killCountItem = new StatusItem({x: 0, y: 118, spriteIndex: 4, getNumber: () => this.status.killCount});
    this.graphics.use(ASSETS.statusBackground.toSprite());
    this.addChild(scoreItem);
    this.addChild(levelItem);
    this.addChild(lifeItem);
    this.addChild(hitCountItem);
    this.addChild(killCountItem);
    if (document.location.hash === "#debug") {
      const hitRateItem = new StatusItem({x: 0, y: 154, spriteIndex: 5, decimalLength: 2, getNumber: () => this.status.hitRate * 100});
      const comboItem = new StatusItem({x: 0, y: 178, spriteIndex: 6, getNumber: () => this.status.combo});
      const comboTimerItem = new StatusItem({x: 0, y: 204, spriteIndex: 7, getNumber: () => STATUS_PROPS.comboDuration - this.status.comboTimer});
      const levelBonusItem = new StatusItem({x: 0, y: 232, spriteIndex: 8, decimalLength: 2, getNumber: () => this.status.levelBonusRatio});
      const hitBonusItem = new StatusItem({x: 0, y: 256, spriteIndex: 9, decimalLength: 2, getNumber: () => this.status.hitBonusRatio});
      const comboBonusItem = new StatusItem({x: 0, y: 280, spriteIndex: 10, decimalLength: 2, getNumber: () => this.status.comboBonusRatio});
      const wholeBonusItem = new StatusItem({x: 0, y: 304, spriteIndex: 11, decimalLength: 2, getNumber: () => this.status.wholeBonusRatio});
      this.addChild(hitRateItem);
      this.addChild(comboItem);
      this.addChild(comboTimerItem);
      this.addChild(levelBonusItem);
      this.addChild(hitBonusItem);
      this.addChild(comboBonusItem);
      this.addChild(wholeBonusItem);
    }
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

}