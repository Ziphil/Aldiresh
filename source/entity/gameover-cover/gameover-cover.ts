//

import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Text,
  vec
} from "excalibur";
import {
  SPRITE_FONTS
} from "/source/core/asset";
import {
  DEPTHS,
  FIELD_PROPS
} from "/source/core/constant";
import {
  Button
} from "/source/entity/button";
import {
  NameInputPane
} from "/source/entity/gameover-cover/name-input-pane";
import {
  Image
} from "/source/entity/image";
import {
  RankingPane
} from "/source/entity/ranking/ranking-pane";
import {
  Status
} from "/source/entity/status";
import {
  Ranking,
  fetchRanking
} from "/source/util/request";


export class GameoverCover extends Actor {

  private ranking!: Ranking;
  private index!: number | null;
  private rankingPane!: RankingPane;
  public status!: Status;

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.gameoverCover,
      width: FIELD_PROPS.width,
      height: FIELD_PROPS.height,
      collisionType: CollisionType["PreventCollision"],
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
  }

  public override onInitialize(engine: Engine): void {
    this.addLabel(engine);
  }

  private async addLabel(engine: Engine): Promise<void> {
    const ranking = await fetchRanking();
    const [index, pushedRanking] = calcPushedRanking(ranking, this.status);
    const topLabelString = (index !== null) ? "Enter Your Name" : "Game Over";
    const buttonString = (index !== null) ? "OK" : "Back";
    const rankingPaneX = (index !== null) ? 35 : 126;
    const topLabel = new Image({x: FIELD_PROPS.width / 2, y: 30, graphic: new Text({text: topLabelString, font: SPRITE_FONTS.char})});
    const button = new Button({x: FIELD_PROPS.width / 2, y: 324, string: buttonString, length: 8, onPress: () => this.back(engine)});
    const rankingPane = new RankingPane({x: rankingPaneX, y: 59, ranking: pushedRanking, simple: true, blinkIndex: index ?? undefined});
    this.ranking = pushedRanking;
    this.index = index;
    this.rankingPane = rankingPane;
    this.addChild(topLabel);
    this.addChild(rankingPane);
    this.addChild(button);
    if (index !== null) {
      const nameInputPane = new NameInputPane({x: 292, y: 59, onPress: (char) => this.editRanking(char)});
      this.addChild(nameInputPane);
    }
  }

  private editRanking(char: string | null): void {
    if (this.index !== null) {
      const ranking = this.ranking.slice();
      const index = this.index;
      const name = (char !== null) ? (ranking[index].name + char).substring(0, 3) : ranking[index].name.substring(0, ranking[index].name.length - 1);
      ranking[this.index] = {...ranking[this.index], name};
      this.ranking = ranking;
      this.rankingPane.ranking = ranking;
    }
  }

  private async back(engine: Engine): Promise<void> {
    if (this.index !== null) {
      Function.prototype();
    }
    engine.goToScene("title");
  }

}


function calcPushedRanking(ranking: Ranking, status: Status): [index: number | null, pushedRanking: Ranking] {
  const pushedRanking = ranking.slice();
  const {score, level, hitCount, killCount} = status;
  const index = pushedRanking.findIndex((result) => result.score < score);
  if (index < 0) {
    return [null, pushedRanking];
  } else {
    pushedRanking.splice(index, 0, {rank: index + 1, name: "", score, level, hitCount, killCount});
    pushedRanking.splice(10, 1);
    for (let i = index + 1 ; i < pushedRanking.length ; i ++) {
      pushedRanking[i] = {...pushedRanking[i], rank: i + 1};
    }
  }
  return [index, pushedRanking];
}