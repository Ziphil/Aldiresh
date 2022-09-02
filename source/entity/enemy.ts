//

import {
  CollisionType,
  Color
} from "excalibur";
import {
  Ship
} from "./ship";


export const ENEMY_BASE_COLOR = Color.fromHSL(0.85, 0.8, 0.5);


export class Enemy extends Ship {

  public constructor(x: number, y: number) {
    super(x, y, ENEMY_BASE_COLOR, {collisionType: CollisionType["Passive"]});
  }

}