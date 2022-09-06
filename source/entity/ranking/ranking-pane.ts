//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  RankingRow
} from "/source/entity/ranking/ranking-row";


export type RankingRowConfigs = {
  x: number,
  y: number,
  ranking: Array<{rank: number, name: string, score: number, level: number, hit: number, kill: number}>,
  simple?: boolean
};


export class RankingPane extends Actor {

  private readonly simple?: boolean;
  private readonly initialRanking?: Array<{rank: number, name: string, score: number, level: number, hit: number, kill: number}>;
  private rows: Array<RankingRow>;

  public constructor({x, y, ...configs}: RankingRowConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.simple = configs.simple;
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
        const row = new RankingRow({x: 0, y: i * 24, result, simple: this.simple});
        this.rows.push(row);
        this.addChild(row);
      }
    }
  }

  public set result(ranking: Array<{rank: number, name: string, score: number, level: number, hit: number, kill: number}>) {
    for (let i = 0 ; i < ranking.length ; i ++) {
      this.rows[i].result = ranking[i];
    }
  }

}