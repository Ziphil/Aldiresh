//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  SPRITE_SHEETS
} from "/source/core/asset";
import {
  DEPTHS
} from "/source/core/constant";
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
      z: DEPTHS.button,
      collisionType: CollisionType["PreventCollision"]
    });
    this.simple = configs.simple;
    this.blinkIndex = configs.blinkIndex;
    this.initialRanking = configs.ranking;
    this.rows = [];
  }

  public override onInitialize(engine: Engine): void {
    if (!this.simple) {
      this.graphics.layers.create({name: "score", order: 1, offset: vec(168, 0)});
      this.graphics.layers.create({name: "level", order: 1, offset: vec(271, 0)});
      this.graphics.layers.create({name: "hit", order: 1, offset: vec(390, 0)});
      this.graphics.layers.create({name: "kill", order: 1, offset: vec(485, 0)});
      this.graphics.layers.get("score").use(SPRITE_SHEETS.statusName.sprites[0]);
      this.graphics.layers.get("level").use(SPRITE_SHEETS.statusName.sprites[1]);
      this.graphics.layers.get("hit").use(SPRITE_SHEETS.statusName.sprites[3]);
      this.graphics.layers.get("kill").use(SPRITE_SHEETS.statusName.sprites[4]);
    }
    this.addChildren();
  }

  private addChildren(): void {
    if (this.initialRanking !== undefined) {
      for (let i = 0 ; i < this.initialRanking.length ; i ++) {
        const result = this.initialRanking[i];
        const simple = this.simple;
        const blink = this.blinkIndex === i;
        const offset = (this.simple) ? 0 : 10;
        const row = new ResultPane({x: 0, y: i * 24 + offset, result, simple, blink});
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