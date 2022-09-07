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
import {Logo} from "/source/entity/logo";
import {
  RankingPane
} from "/source/entity/ranking/ranking-pane";
import {
  Status
} from "/source/entity/status";
import {
  Ranking
} from "/source/util/request";


export class TitleCover extends Actor {

  private ranking!: Ranking;
  private rank!: number | null;
  private rankingName: string;
  private rankingPane!: RankingPane;
  public status!: Status;

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
    this.rankingName = "";
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren(engine);
  }

  private async addChildren(engine: Engine): Promise<void> {
    const logo = new Logo({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2 - 30});
    const button = new Button({x: SCREEN_PROPS.width / 2, y: SCREEN_PROPS.height / 2 + 30, string: "Start", length: 8, onPress: () => engine.goToScene("main")});
    this.addChild(logo);
    this.addChild(button);
  }

}