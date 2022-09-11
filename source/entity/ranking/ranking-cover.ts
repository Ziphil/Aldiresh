//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Entity,
  vec
} from "excalibur";
import {
  DEPTHS,
  SCREEN_DIMENSION
} from "/source/core/constant";
import {
  Button
} from "/source/entity/button";
import {
  RankingPane
} from "/source/entity/ranking/ranking-pane";
import {
  StringLabel
} from "/source/entity/string-label";
import {
  fetchRanking
} from "/source/util/request";


export class RankingCover extends Actor {

  private waitLabel!: Entity;

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.cover,
      width: SCREEN_DIMENSION.width,
      height: SCREEN_DIMENSION.height,
      collisionType: CollisionType["PreventCollision"],
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
  }

  public override onInitialize(engine: Engine): void {
    this.addWaitingChildren(engine);
    this.addFinalChildren(engine);
  }

  private addWaitingChildren(engine: Engine): void {
    const waitLabel = new StringLabel({x: SCREEN_DIMENSION.width / 2, y: SCREEN_DIMENSION.height / 2, anchor: vec(0.5, 0.5), value: "Please Wait"});
    this.waitLabel = waitLabel;
    this.addChild(waitLabel);
  }

  private async addFinalChildren(engine: Engine): Promise<void> {
    const ranking = await fetchRanking();
    const topLabel = new StringLabel({x: SCREEN_DIMENSION.width / 2, y: 30, anchor: vec(0.5, 0.5), value: "Ranking"});
    const button = new Button({x: SCREEN_DIMENSION.width / 2, y: 324, string: "Back", length: 8, onPress: () => engine.goToScene("title")});
    const rankingPane = new RankingPane({x: 71, y: 53, ranking});
    this.removeChild(this.waitLabel);
    this.addChild(topLabel);
    this.addChild(button);
    this.addChild(rankingPane);
  }

}