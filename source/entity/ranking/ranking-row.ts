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
import {
  Result
} from "/source/util/request";


export type RankingRowConfigs = {
  x: number,
  y: number,
  result?: Result,
  simple?: boolean,
  blink?: boolean
};


export class RankingRow extends Actor {

  private readonly simple: boolean;
  private readonly blink: boolean;
  private readonly initialResult?: Result;
  private rankLabel!: StringLabel;
  private nameLabel!: StringLabel;
  private scoreItem!: RankingItem;
  private levelItem?: RankingItem;
  private hitCoundItem?: RankingItem;
  private killCountItem?: RankingItem;

  public constructor({x, y, ...configs}: RankingRowConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.simple = configs.simple ?? false;
    this.blink = configs.blink ?? false;
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
      const hitCountItem = new RankingItem({x: 330, y: 0, string: this.initialResult?.hitCount, length: 5});
      const killCountItem = new RankingItem({x: 433, y: 0, string: this.initialResult?.killCount, length: 5});
      this.levelItem = levelItem;
      this.hitCoundItem = hitCountItem;
      this.killCountItem = killCountItem;
      this.addChild(levelItem);
      this.addChild(hitCountItem);
      this.addChild(killCountItem);
    }
  }

  public set result(result: Result) {
    this.rankLabel.string = result.rank;
    this.nameLabel.string = result.name;
    this.scoreItem.string = result.score;
    if (this.levelItem !== undefined && this.hitCoundItem !== undefined && this.killCountItem !== undefined) {
      this.levelItem.string = result.level;
      this.hitCoundItem.string = result.hitCount;
      this.killCountItem.string = result.killCount;
    }
  }

}