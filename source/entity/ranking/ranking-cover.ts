//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  vec
} from "excalibur";
import {
  DEPTHS,
  SCREEN_PROPS
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

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.cover,
      width: SCREEN_PROPS.width,
      height: SCREEN_PROPS.height,
      collisionType: CollisionType["PreventCollision"],
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren(engine);
  }

  private async addChildren(engine: Engine): Promise<void> {
    const ranking = await fetchRanking();
    const topLabel = new StringLabel({x: SCREEN_PROPS.width / 2, y: 30, anchor: vec(0.5, 0.5), value: "Ranking"});
    const button = new Button({x: SCREEN_PROPS.width / 2, y: 324, string: "Back", length: 8, onPress: () => engine.goToScene("main")});
    const rankingPane = new RankingPane({x: 71, y: 59, ranking});
    this.addChild(topLabel);
    this.addChild(button);
    this.addChild(rankingPane);
  }

}