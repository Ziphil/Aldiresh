//

import {
  Engine,
  Entity
} from "excalibur";
import {
  ScoreLabel
} from "/source/entity/score-label";


const STATUS_PROPS = {
  levelInterval: 15000,
  maxLevel: 99,
  initialLife: 15,
  comboDuration: 2000,
  maxCombo: 40
};


export class Status extends Entity {

  public score: number;
  public level: number;
  public levelTime: number;
  public life: number;
  public shootCount: number;
  public missCount: number;
  public hitCount: number;
  public killCount: number;
  public combo: number;
  public comboTime: number;
  private labels: Array<ScoreLabel>;

  public constructor() {
    super();
    this.score = 0;
    this.level = 0;
    this.levelTime = 0;
    this.life = STATUS_PROPS.initialLife;
    this.shootCount = 0;
    this.missCount = 0;
    this.hitCount = 0;
    this.killCount = 0;
    this.combo = 0;
    this.comboTime = 0;
    this.labels = [];
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.updateLevel(delta);
    this.updateCombo(delta);
    this.addLabels(engine);
  }

  private updateLevel(delta: number): void {
    this.levelTime += delta;
    if (this.level < STATUS_PROPS.maxLevel && this.levelTime >= STATUS_PROPS.levelInterval) {
      this.level ++;
      this.levelTime -= STATUS_PROPS.levelInterval;
    }
  }

  private updateCombo(delta: number): void {
    if (this.comboTime < STATUS_PROPS.comboDuration) {
      this.comboTime += delta;
      if (this.comboTime >= STATUS_PROPS.comboDuration) {
        this.combo = 0;
      }
    }
  }

  private addLabels(engine: Engine): void {
    for (const label of this.labels) {
      engine.add(label);
    };
    this.labels = [];
  }

  public shoot(): void {
    if (this.life >= 0) {
      this.shootCount ++;
    }
  }

  public miss(): void {
    if (this.life >= 0) {
      this.missCount ++;
    }
  }

  public hitEnemy(x: number, y: number, dead: boolean): void {
    if (this.life >= 0) {
      const gainedScore = Math.floor(15 * this.wholeBonusRatio * ((dead) ? 3 : 1));
      this.score += gainedScore;
      this.hitCount ++;
      this.comboTime = 0;
      if (dead) {
        this.killCount ++;
      }
      if (this.combo < STATUS_PROPS.maxCombo) {
        this.combo ++;
      }
      this.emitScoreLabel(x, y, gainedScore);
    }
  }

  public damage(): void {
    if (this.life >= 0) {
      this.life --;
    }
  }

  private emitScoreLabel(x: number, y: number, score: number): void {
    const label = new ScoreLabel({x, y, score});
    this.labels.push(label);
  }

  public get hitRate(): number {
    return (this.shootCount === 0) ? 1 : 1 - this.missCount / this.shootCount;
  }

  public get comboRate(): number {
    return this.combo / STATUS_PROPS.maxCombo;
  }

  public get levelBonusRatio(): number {
    return this.level / 5 + 1;
  }

  public get hitBonusRatio(): number {
    return this.hitRate * 4 + 1;
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

  public get averageShootTimeout(): number {
    return 3500 - this.level * 85;
  }

}