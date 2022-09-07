//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  ResultPane
} from "/source/entity/ranking/result-pane";
import {
  Ranking
} from "/source/util/request";


export type RankingRowConfigs = {
  x: number,
  y: number,
  ranking: Ranking,
  simple?: boolean,
  blinkIndex?: number
};


export class RankingPane extends Actor {

  private readonly simple?: boolean;
  private readonly blinkIndex?: number;
  private readonly initialRanking?: Ranking;
  private rows: Array<ResultPane>;

  public constructor({x, y, ...configs}: RankingRowConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.simple = configs.simple;
    this.blinkIndex = configs.blinkIndex;
    this.initialRanking = configs.ranking;
    this.rows = [];
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren();
  }

  private addChildren(): void {
    if (this.initialRanking !== undefined) {
      for (let i = 0 ; i < this.initialRanking.length ; i ++) {
        const result = this.initialRanking[i];
        const simple = this.simple;
        const blink = this.blinkIndex === i;
        const row = new ResultPane({x: 0, y: i * 24, result, simple, blink});
        this.rows.push(row);
        this.addChild(row);
      }
    }
  }

  public set ranking(ranking: Ranking) {
    for (let i = 0 ; i < ranking.length ; i ++) {
      this.rows[i].result = ranking[i];
    }
  }

}