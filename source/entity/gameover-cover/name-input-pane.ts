//

import {
  Actor,
  CollisionType,
  Engine,
  vec
} from "excalibur";
import {
  Button
} from "/source/entity/button";


export type RankingItemConfigs = {
  x: number,
  y: number,
  onPress: (char: string | null) => void
};


export class NameInputPane extends Actor {

  private readonly onPress: (char: string | null) => void;

  public constructor({x, y, ...configs}: RankingItemConfigs) {
    super({
      pos: vec(x, y),
      anchor: vec(0, 0),
      collisionType: CollisionType["PreventCollision"]
    });
    this.onPress = configs.onPress;
  }

  public override onInitialize(engine: Engine): void {
    this.addChildren();
  }

  private addChildren(): void {
    for (let i = 0 ; i < 3 ; i ++) {
      const maxJ = (i === 2) ? 6 : 10;
      for (let j = 0 ; j < maxJ ; j ++) {
        const char = String.fromCodePoint(0x41 + j + i * 10);
        const button = new Button({x: i * 51 + 25, y: j * 24 + 8, string: char, length: 1, onPress: () => this.onPress(char)});
        this.addChild(button);
      }
    }
    const hyphenButton = new Button({x: 2 * 51 + 25, y: 6 * 24 + 8, string: "-", length: 1, onPress: () => this.onPress("-")});
    const deleteButton = new Button({x: 2 * 51 + 25, y: 9 * 24 + 8, string: "@", length: 1, onPress: () => this.onPress(null)});
    this.addChild(hyphenButton);
    this.addChild(deleteButton);
  }

}