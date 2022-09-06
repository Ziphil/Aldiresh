//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  RankingItem
} from "/source/entity/ranking/ranking-item";
import {
  StringLabel
} from "/source/entity/string-label";


export type RankingRowConfigs = {
  x: number,
  y: number,
  result?: {rank: number, name: string, score: number, level: number, hit: number, kill: number},
  simple?: boolean
};


export class RankingRow extends Actor {

  private readonly simple?: boolean;
  private readonly initialResult?: {rank: number, name: string, score: number, level: number, hit: number, kill: number};
  private rankLabel!: StringLabel;
  private nameLabel!: StringLabel;
  private scoreItem!: RankingItem;
  private levelItem?: RankingItem;
  private hitItem?: RankingItem;
  private killItem?: RankingItem;

  public constructor({x, y, ...configs}: RankingRowConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.simple = configs.simple ?? false;
    this.initialResult = configs.result;
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren();
  }

  private addChildren(): void {
    const rankLabel = new StringLabel({x: 24, y: 8, string: this.initialResult?.rank});
    const nameLabel = new StringLabel({x: 73, y: 8, string: this.initialResult?.name});
    const scoreItem = new RankingItem({x: 85, y: 0, string: this.initialResult?.score, length: 8});
    this.rankLabel = rankLabel;
    this.nameLabel = nameLabel;
    this.scoreItem = scoreItem;
    this.addChild(rankLabel);
    this.addChild(nameLabel);
    this.addChild(scoreItem);
    if (!this.simple) {
      const levelItem = new RankingItem({x: 227, y: 0, string: this.initialResult?.level, length: 5});
      const hitItem = new RankingItem({x: 330, y: 0, string: this.initialResult?.hit, length: 5});
      const killItem = new RankingItem({x: 433, y: 0, string: this.initialResult?.kill, length: 5});
      this.levelItem = levelItem;
      this.hitItem = hitItem;
      this.killItem = killItem;
      this.addChild(levelItem);
      this.addChild(hitItem);
      this.addChild(killItem);
    }
  }

  public set result(result: {rank: number, name: string, score: number, level: number, hit: number, kill: number}) {
    this.rankLabel.string = result.rank;
    this.nameLabel.string = result.name;
    this.scoreItem.string = result.score;
    if (this.levelItem !== undefined && this.hitItem !== undefined && this.killItem !== undefined) {
      this.levelItem.string = result.level;
      this.hitItem.string = result.hit;
      this.killItem.string = result.kill;
    }
  }

}