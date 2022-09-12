//

import {
  Component,
  Engine,
  Entity,
  Input,
  Scene,
  System,
  SystemType,
  TransformComponent
} from "excalibur";


const INPUT_COMPONENT_TYPE = "zp.input" as const;
const INPUT_SYSTEM_TYPES = ["zp.input", "ex.transform"] as const;


export class InputComponent extends Component<typeof INPUT_COMPONENT_TYPE> {

  public readonly type: any = INPUT_COMPONENT_TYPE;
  public keyboardPrimaryX: number;
  public keyboardPrimaryY: number;
  public gamepadPrimaryX: number;
  public gamepadPrimaryY: number;
  public keyboardSecondaryX: number;
  public keyboardSecondaryY: number;
  public gamepadSecondaryX: number;
  public gamepadSecondaryY: number;
  public buttonPressed: boolean;

  public constructor() {
    super();
    this.keyboardPrimaryX = 0;
    this.keyboardPrimaryY = 0;
    this.gamepadPrimaryX = 0;
    this.gamepadPrimaryY = 0;
    this.keyboardSecondaryX = 0;
    this.keyboardSecondaryY = 0;
    this.gamepadSecondaryX = 0;
    this.gamepadSecondaryY = 0;
    this.buttonPressed = false;
  }

  public get primaryX(): number {
    return compareAbs(this.keyboardPrimaryX, this.gamepadPrimaryX);
  }

  public get primaryY(): number {
    return compareAbs(this.keyboardPrimaryY, this.gamepadPrimaryY);
  }

  public get secondaryX(): number {
    return compareAbs(this.keyboardSecondaryX, this.gamepadSecondaryX);
  }

  public get secondaryY(): number {
    return compareAbs(this.keyboardSecondaryY, this.gamepadSecondaryY);
  }

}


export class InputSystem extends System<InputComponent | TransformComponent> {

  public readonly types: any = INPUT_SYSTEM_TYPES;
  public readonly systemType: SystemType = SystemType["Update"];
  private buttonPressed!: boolean;
  private engine!: Engine;

  public override initialize(scene: Scene): void {
    this.buttonPressed = false;
    this.engine = scene.engine;
    this.addEventListeners();
  }

  public override update(entities: Array<Entity>, delta: number): void {
    for (const entity of entities) {
      this.updateKeyboard(entity, delta);
      this.updateGamepad(entity, delta);
      this.updateButton(entity);
    }
    this.resetButton();
  }

  private addEventListeners(): void {
    const pointer = this.engine.input.pointers.primary;
    const gamepad = this.engine.input.gamepads.at(0);
    pointer.on("down", () => this.buttonPressed = true);
    gamepad.on("button", () => this.buttonPressed = true);
  }

  private updateKeyboard(entity: Entity, delta: number): void {
    const input = entity.get(InputComponent)!;
    const keyboard = this.engine.input.keyboard;
    input.keyboardPrimaryX = +(keyboard.isHeld(Input["Keys"]["ArrowRight"]) || keyboard.isHeld(Input["Keys"]["D"])) - +(keyboard.isHeld(Input["Keys"]["ArrowLeft"]) || keyboard.isHeld(Input["Keys"]["A"]));
    input.keyboardPrimaryY = +(keyboard.isHeld(Input["Keys"]["ArrowDown"]) || keyboard.isHeld(Input["Keys"]["S"])) - +(keyboard.isHeld(Input["Keys"]["ArrowUp"]) || keyboard.isHeld(Input["Keys"]["W"]));
    input.keyboardSecondaryX = +keyboard.isHeld(Input["Keys"]["L"]) - +keyboard.isHeld(Input["Keys"]["J"]);
    input.keyboardSecondaryY = +keyboard.isHeld(Input["Keys"]["K"]) - +keyboard.isHeld(Input["Keys"]["I"]);
  }

  private updateGamepad(entity: Entity, delta: number): void {
    const input = entity.get(InputComponent)!;
    const gamepad = this.engine.input.gamepads.at(0);
    input.gamepadPrimaryX = gamepad.getAxes(Input["Axes"]["LeftStickX"]);
    input.gamepadPrimaryY = gamepad.getAxes(Input["Axes"]["LeftStickY"]);
    input.gamepadSecondaryX = gamepad.getAxes(Input["Axes"]["RightStickX"]);
    input.gamepadSecondaryY = gamepad.getAxes(Input["Axes"]["RightStickY"]);
  }

  private updateButton(entity: Entity): void {
    const input = entity.get(InputComponent)!;
    input.buttonPressed = this.buttonPressed;
  }

  private resetButton(): void {
    this.buttonPressed = false;
  }

}


function compareAbs(first: number, second: number): number {
  if (Math.abs(first) >= Math.abs(second)) {
    return first;
  } else {
    return second;
  }
}