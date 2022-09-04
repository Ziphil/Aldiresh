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
    const keyboardX = this.getKeyboardLeftX();
    const gamepadX = this.getGampepadLeftX();
    if (Math.abs(keyboardX) >= Math.abs(gamepadX)) {
      return keyboardX;
    } else {
      return gamepadX;
    }
  }

  public getLeftY(): number {
    const keyboardY = this.getKeyboardLeftY();
    const gamepadY = this.getGampepadLeftY();
    if (Math.abs(keyboardY) >= Math.abs(gamepadY)) {
      return keyboardY;
    } else {
      return gamepadY;
    }
  }

  public getRightX(): number {
    return this.getGampepadRightX();
  }

  public getRightY(): number {
    return this.getGampepadRightY();
  }

  private getKeyboardLeftX(): number {
    const keyboard = this.engine.input.keyboard;
    let x = 0;
    if (keyboard.isHeld(Input["Keys"]["ArrowLeft"]) || keyboard.isHeld(Input["Keys"]["A"])) {
      x -= 1;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowRight"]) || keyboard.isHeld(Input["Keys"]["D"])) {
      x += 1;
    }
    return x;
  }

  private getKeyboardLeftY(): number {
    const keyboard = this.engine.input.keyboard;
    let y = 0;
    if (keyboard.isHeld(Input["Keys"]["ArrowUp"]) || keyboard.isHeld(Input["Keys"]["W"])) {
      y -= 1;
    }
    if (keyboard.isHeld(Input["Keys"]["ArrowDown"]) || keyboard.isHeld(Input["Keys"]["S"])) {
      y += 1;
    }
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