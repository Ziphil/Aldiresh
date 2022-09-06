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


const RANKING = [
  {rank: 1, name: "SLF", score: 1047502, level: 32, kill: 398, hit: 1203},
  {rank: 2, name: "XRS", score: 845749, level: 30, kill: 323, hit: 916},
  {rank: 3, name: "KJH", score: 745749, level: 29, kill: 293, hit: 816},
  {rank: 4, name: "JHG", score: 645749, level: 28, kill: 263, hit: 716},
  {rank: 5, name: "DFG", score: 545749, level: 27, kill: 233, hit: 616},
  {rank: 6, name: "CVB", score: 445749, level: 26, kill: 203, hit: 516},
  {rank: 7, name: "BNM", score: 345749, level: 25, kill: 173, hit: 416},
  {rank: 8, name: "MNB", score: 245749, level: 24, kill: 143, hit: 316},
  {rank: 9, name: "VBN", score: 145749, level: 23, kill: 113, hit: 216},
  {rank: 10, name: "ASD", score: 45749, level: 22, kill: 83, hit: 116}
];


export class GameoverCover extends Actor {

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

  private addLabel(engine: Engine): void {
    const topText = new Text({text: "Game Over", font: SPRITE_FONTS.char});
    const topLabel = new Image({x: FIELD_PROPS.width / 2, y: 30, graphic: topText});
    const rankingPane = new RankingPane({x: 35, y: 59, ranking: RANKING, simple: true});
    const nameInputPane = new NameInputPane({x: 292, y: 59, onPress: () => null});
    const backButton = new Button({x: FIELD_PROPS.width / 2, y: FIELD_PROPS.height - 36, string: "Back", length: 8, onPress: () => engine.goToScene("title")});
    this.addChild(topLabel);
    this.addChild(rankingPane);
    this.addChild(nameInputPane);
    this.addChild(backButton);
  }

}