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
  FIELD_PROPS
} from "/source/core/constant";
import {
  Button
} from "/source/entity/button";
import {
  NameInputPane
} from "/source/entity/gameover/name-input-pane";
import {
  Status
} from "/source/entity/main/status";
import {
  RankingPane
} from "/source/entity/ranking/ranking-pane";
import {
  StringLabel
} from "/source/entity/string-label";
import {
  Ranking,
  Result,
  fetchRanking,
  sendResult
} from "/source/util/request";


export class GameoverCover extends Actor {

  private ranking!: Ranking;
  private rank!: number | null;
  private rankingName: string;
  private gameoverLabel!: Entity;
  private waitLabel!: Entity;
  private rankingPane!: RankingPane;
  public status!: Status;

  public constructor() {
    super({
      pos: vec(0, 0),
      anchor: vec(0, 0),
      z: DEPTHS.cover,
      width: FIELD_PROPS.width,
      height: FIELD_PROPS.height,
      collisionType: CollisionType["PreventCollision"],
      color: Color.fromHSL(0, 0, 0, 0.5)
    });
    this.rankingName = "";
  }

  public override onInitialize(engine: Engine): void {
    this.addWaitingChildren(engine);
    this.addFinalChildren(engine);
  }

  private addWaitingChildren(engine: Engine): void {
    const gameoverLabel = new StringLabel({x: FIELD_PROPS.width / 2, y: FIELD_PROPS.height / 2 - 12, anchor: vec(0.5, 0.5), value: "Game Over"});
    const waitLabel = new StringLabel({x: FIELD_PROPS.width / 2, y: FIELD_PROPS.height / 2 + 12, anchor: vec(0.5, 0.5), value: "Please Wait"});
    this.gameoverLabel = gameoverLabel;
    this.waitLabel = waitLabel;
    this.addChild(gameoverLabel);
    this.addChild(waitLabel);
  }

  private async addFinalChildren(engine: Engine): Promise<void> {
    const ranking = await fetchRanking();
    const [rank, pushedRanking] = calcPushedRanking(ranking, this.status);
    const topLabelString = (rank !== null) ? "Enter Your Name" : "Game Over";
    const buttonString = (rank !== null) ? "OK" : "Back";
    const topLabel = new StringLabel({x: FIELD_PROPS.width / 2, y: 30, anchor: vec(0.5, 0.5), value: topLabelString});
    const button = new Button({x: FIELD_PROPS.width / 2, y: 324, string: buttonString, length: 8, onPress: () => this.backTitle(engine)});
    const rankingPane = new RankingPane({x: (rank !== null) ? 35 : 126, y: 59, ranking: pushedRanking, simple: true, blinkIndex: rank ?? undefined});
    this.ranking = pushedRanking;
    this.rank = rank;
    this.rankingPane = rankingPane;
    this.removeChild(this.gameoverLabel);
    this.removeChild(this.waitLabel);
    this.addChild(topLabel);
    this.addChild(rankingPane);
    this.addChild(button);
    if (rank !== null) {
      const nameInputPane = new NameInputPane({x: 292, y: 59, onPress: (char) => this.editRanking(char)});
      this.addChild(nameInputPane);
    }
  }

  private editRanking(char: string | null): void {
    if (this.rank !== null) {
      const ranking = this.ranking.slice();
      const index = this.rank;
      const name = (char !== null) ? (ranking[index].name + char).substring(0, 3) : ranking[index].name.substring(0, ranking[index].name.length - 1);
      ranking[this.rank] = {...ranking[this.rank], name};
      this.ranking = ranking;
      this.rankingName = name;
      this.rankingPane.ranking = ranking;
    }
  }

  private backTitle(engine: Engine): void {
    if (this.rank !== null) {
      const name = this.rankingName;
      const {score, level, hitCount, killCount} = this.status;
      sendResult({name, score, level, hitCount, killCount});
    }
    engine.goToScene("title");
  }

}


function calcPushedRanking(ranking: Ranking, result: Omit<Result, "rank">): [rank: number | null, pushedRanking: Ranking] {
  const pushedRanking = ranking.slice();
  const {score, level, hitCount, killCount} = result;
  const rank = pushedRanking.findIndex((rankingResult) => rankingResult.score <= score);
  if (rank < 0) {
    return [null, pushedRanking];
  } else {
    pushedRanking.splice(rank, 0, {rank, name: "", score, level, hitCount, killCount});
    pushedRanking.splice(10, 1);
    for (let i = rank + 1 ; i < pushedRanking.length ; i ++) {
      pushedRanking[i] = {...pushedRanking[i], rank: pushedRanking[i].rank + 1};
    }
  }
  return [rank, pushedRanking];
}