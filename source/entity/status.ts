//

import {
  Engine,
  Entity
} from "excalibur";


const STATUS_CONFIGS = {
  levelInterval: 25000,
  maxLevel: 50,
  comboDuration: 200,
  maxCombo: 40
};


export class Status extends Entity {

  public level: number = 0;
  public levelTime: number = 0;
  public life: number = 15;
  public score: number = 0;
  public missCount: number = 0;
  public shootCount: number = 0;
  public hitCount: number = 0;
  public killCount: number = 0;
  public combo: number = 0;
  public comboTime: number = 0;

  public constructor() {
    super();
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.updateLevel(delta);
  }

  private updateLevel(delta: number): void {
    this.levelTime += delta;
    if (this.level < STATUS_CONFIGS.maxLevel && this.levelTime >= STATUS_CONFIGS.levelInterval) {
      this.level ++;
      this.levelTime -= STATUS_CONFIGS.levelInterval;
    }
  }

  public shoot(): void {
    this.shootCount ++;
  }

  public hitEnemy(dead: boolean): void {
    const gainedScore = 15 * this.wholeBonusRatio * ((dead) ? 3 : 1);
    this.score += gainedScore;
    this.hitCount ++;
    if (dead) {
      this.killCount ++;
    }
    if (this.combo < STATUS_CONFIGS.maxCombo) {
      this.combo ++;
    }
    this.comboTime = STATUS_CONFIGS.comboDuration;
  }

  public get levelBonusRatio(): number {
    return this.level / 5 + 1;
  }

  public get hitRate(): number {
    return (this.shootCount === 0) ? 1 : 1 - this.missCount / this.shootCount;
  }

  public get hitBonusRatio(): number {
    return this.hitRate * 4 + 1;
  }

  public get comboRate(): number {
    return this.combo / STATUS_CONFIGS.maxCombo;
  }

  public get comboBonusRatio(): number {
    return this.comboRate * 4 + 1;
  }

  public get wholeBonusRatio(): number {
    return this.levelBonusRatio * this.hitBonusRatio * this.comboBonusRatio;
  }

  public get averageSpawnTimeout(): number {
    return 3000 - this.level * 60;
  }

}