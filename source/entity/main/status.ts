//

import {
  Engine,
  Entity
} from "excalibur";
import {
  ScoreLabel
} from "/source/entity/main/score-label";


export const STATUS_PROPS = {
  levelInterval: 15000,
  maxLevel: 50,
  initialLife: 5,
  comboDuration: 3000,
  maxCombo: 30
};


export class Status extends Entity {

  public score: number;
  public level: number;
  public levelTimer: number;
  public life: number;
  public shootCount: number;
  public missCount: number;
  public hitCount: number;
  public killCount: number;
  public combo: number;
  public comboTimer: number;
  private labels: Array<ScoreLabel>;

  public constructor() {
    super();
    this.score = 0;
    this.level = 0;
    this.levelTimer = 0;
    this.life = STATUS_PROPS.initialLife;
    this.shootCount = 0;
    this.missCount = 0;
    this.hitCount = 0;
    this.killCount = 0;
    this.combo = 0;
    this.comboTimer = STATUS_PROPS.comboDuration;
    this.labels = [];
  }

  public override onPreUpdate(engine: Engine, delta: number): void {
    this.updateLevel(delta);
    this.updateCombo(delta);
    this.addLabels(engine);
  }

  private updateLevel(delta: number): void {
    if (this.life > 0) {
      this.levelTimer += delta;
      if (this.level < STATUS_PROPS.maxLevel && this.levelTimer >= STATUS_PROPS.levelInterval) {
        this.level ++;
        this.levelTimer -= STATUS_PROPS.levelInterval;
      }
    }
  }

  private updateCombo(delta: number): void {
    if (this.comboTimer < STATUS_PROPS.comboDuration) {
      this.comboTimer += delta;
      if (this.comboTimer >= STATUS_PROPS.comboDuration) {
        this.comboTimer = STATUS_PROPS.comboDuration;
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
    if (this.life > 0) {
      this.shootCount ++;
    }
  }

  public miss(): void {
    if (this.life > 0) {
      this.missCount ++;
    }
  }

  public hit(x: number, y: number, dead: boolean): void {
    if (this.life > 0) {
      const gainedScore = this.calcHitScore(dead);
      this.score += gainedScore;
      this.hitCount ++;
      this.comboTimer = 0;
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
    if (this.life > 0) {
      this.life --;
    }
  }

  public recover(x: number, y: number): void {
    if (this.life > 0) {
      const gainedScore = this.calcItemScore();
      this.score += gainedScore;
      this.life ++;
      this.emitScoreLabel(x, y, gainedScore);
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
    return this.hitRate + 1;
  }

  public get comboBonusRatio(): number {
    return this.comboRate + 1;
  }

  public get wholeBonusRatio(): number {
    return this.levelBonusRatio * this.hitBonusRatio * this.comboBonusRatio;
  }

  public calcHitScore(dead: boolean): number {
    const deadBonusRatio = (dead) ? 3 : 1;
    const score = this.wholeBonusRatio * deadBonusRatio * 50;
    return Math.floor(score);
  }

  public calcItemScore(): number {
    const score = this.levelBonusRatio * 300;
    return Math.floor(score);
  }

  public calcAverageSpawnTimeout(): number {
    return 150 * 3000 / (this.level * 12 + 150);
  }

  public calcAverageShootTimeout(): number {
    return 150 * 1000 / (this.level * 10 + 150);
  }

  public calcItemProbability(): number {
    return Math.min(this.level * 0.01, 0.2);
  }

}