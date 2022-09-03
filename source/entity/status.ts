//

import {
  Engine,
  Entity
} from "excalibur";


const LEVEL_INTERVAL = 25000;
const MAX_LEVEL = 50;


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
    if (this.level < MAX_LEVEL && this.levelTime >= LEVEL_INTERVAL) {
      this.level ++;
      this.levelTime -= LEVEL_INTERVAL;
    }
  }

  public get averageSpawnTimeout(): number {
    return 3000 - this.level * 60;
  }

}