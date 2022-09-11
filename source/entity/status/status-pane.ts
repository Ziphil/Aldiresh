//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";
import {
  DEPTHS,
  FIELD_DIMENSION
} from "/source/core/constant";
import {
  STATUS_PROPS,
  Status
} from "/source/entity/main/status";
import {
  StatusItem
} from "/source/entity/status/status-item";


export class StatusPane extends Actor {

  public status!: Status;

  public constructor() {
    super({
      pos: vec(FIELD_DIMENSION.width, 0),
      anchor: vec(0, 0),
      z: DEPTHS.statusPane,
      collisionType: CollisionType["PreventCollision"]
    });
    this.graphics.use(ASSETS.statusBackground.toSprite());
  }

  public override onInitialize(engine: Engine): void {
    this.addItems();
    this.addDebugItems();
  }

  private addItems(): void {
    const scoreItem = new StatusItem({x: 0, y: 12, spriteIndex: 0, getNumber: () => this.status.score});
    const levelItem = new StatusItem({x: 0, y: 42, spriteIndex: 1, getNumber: () => this.status.level + 1});
    const lifeItem = new StatusItem({x: 0, y: 66, spriteIndex: 2, getNumber: () => this.status.life});
    const hitCountItem = new StatusItem({x: 0, y: 96, spriteIndex: 3, getNumber: () => this.status.hitCount});
    const killCountItem = new StatusItem({x: 0, y: 120, spriteIndex: 4, getNumber: () => this.status.killCount});
    this.addChild(scoreItem);
    this.addChild(levelItem);
    this.addChild(lifeItem);
    this.addChild(hitCountItem);
    this.addChild(killCountItem);
  }

  private addDebugItems(): void {
    if (document.location.hash === "#debug") {
      const hitRateItem = new StatusItem({x: 0, y: 156, spriteIndex: 5, decimalLength: 2, getNumber: () => this.status.hitRate * 100});
      const comboItem = new StatusItem({x: 0, y: 180, spriteIndex: 6, getNumber: () => this.status.combo});
      const comboTimerItem = new StatusItem({x: 0, y: 206, spriteIndex: 7, getNumber: () => STATUS_PROPS.comboDuration - this.status.comboTimer});
      const levelBonusItem = new StatusItem({x: 0, y: 234, spriteIndex: 8, decimalLength: 2, getNumber: () => this.status.levelBonusRatio});
      const hitBonusItem = new StatusItem({x: 0, y: 258, spriteIndex: 9, decimalLength: 2, getNumber: () => this.status.hitBonusRatio});
      const comboBonusItem = new StatusItem({x: 0, y: 282, spriteIndex: 10, decimalLength: 2, getNumber: () => this.status.comboBonusRatio});
      const wholeBonusItem = new StatusItem({x: 0, y: 306, spriteIndex: 11, decimalLength: 2, getNumber: () => this.status.wholeBonusRatio});
      this.addChild(hitRateItem);
      this.addChild(comboItem);
      this.addChild(comboTimerItem);
      this.addChild(levelBonusItem);
      this.addChild(hitBonusItem);
      this.addChild(comboBonusItem);
      this.addChild(wholeBonusItem);
    }
  }

}