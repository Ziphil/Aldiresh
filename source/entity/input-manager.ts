//

import {
  Engine,
  Input
} from "excalibur";


export class InputManager {

  private engine: Engine;

  public constructor(engine: Engine) {
    this.engine = engine;
  }

  public getLeftX(): number {
    return compareAbs(this.getKeyboardLeftX(), this.getGampepadLeftX());
  }

  public getLeftY(): number {
    return compareAbs(this.getKeyboardLeftY(), this.getGampepadLeftY());
  }

  public getRightX(): number {
    return this.getGampepadRightX();
  }

  public getRightY(): number {
    return this.getGampepadRightY();
  }

  private getKeyboardLeftX(): number {
    const keyboard = this.engine.input.keyboard;
    const x = +(keyboard.isHeld(Input["Keys"]["ArrowRight"]) || keyboard.isHeld(Input["Keys"]["D"])) - +(keyboard.isHeld(Input["Keys"]["ArrowLeft"]) || keyboard.isHeld(Input["Keys"]["A"]));
    return x;
  }

  private getKeyboardLeftY(): number {
    const keyboard = this.engine.input.keyboard;
    const y = +(keyboard.isHeld(Input["Keys"]["ArrowUp"]) || keyboard.isHeld(Input["Keys"]["W"])) - +(keyboard.isHeld(Input["Keys"]["ArrowDown"]) || keyboard.isHeld(Input["Keys"]["S"]));
    return y;
  }

  private getGampepadLeftX(): number {
    const gamepad = this.engine.input.gamepads.at(0);
    const x = gamepad.getAxes(Input["Axes"]["LeftStickX"]);
    return x;
  }

  private getGampepadLeftY(): number {
    const gamepad = this.engine.input.gamepads.at(0);
    const y = gamepad.getAxes(Input["Axes"]["LeftStickY"]);
    return y;
  }

  private getGampepadRightX(): number {
    const gamepad = this.engine.input.gamepads.at(0);
    const x = gamepad.getAxes(Input["Axes"]["RightStickX"]);
    return x;
  }

  private getGampepadRightY(): number {
    const gamepad = this.engine.input.gamepads.at(0);
    const y = gamepad.getAxes(Input["Axes"]["RightStickY"]);
    return y;
  }

  public setOnButtonDown(callback: () => void): void {
    const pointer = this.engine.input.pointers.primary;
    const gamepad = this.engine.input.gamepads.at(0);
    pointer.on("down", callback);
    gamepad.on("button", callback);
  }

}


function compareAbs(first: number, second: number): number {
  if (Math.abs(first) >= Math.abs(second)) {
    return first;
  } else {
    return second;
  }
}