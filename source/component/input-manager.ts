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


const INPUT_MANAGER_COMPONENT_TYPE = "zp.inputManager" as const;
const INPUT_MANAGER_SYSTEM_TYPES = ["zp.inputManager", "ex.transform"] as const;


export class InputManagerComponent extends Component<typeof INPUT_MANAGER_COMPONENT_TYPE> {

  public readonly type: any = INPUT_MANAGER_COMPONENT_TYPE;
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


export class InputManagerSystem extends System<InputManagerComponent | TransformComponent> {

  public readonly types: any = INPUT_MANAGER_SYSTEM_TYPES;
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
    const component = entity.get(InputManagerComponent)!;
    const keyboard = this.engine.input.keyboard;
    component.keyboardPrimaryX = +(keyboard.isHeld(Input["Keys"]["ArrowRight"]) || keyboard.isHeld(Input["Keys"]["D"])) - +(keyboard.isHeld(Input["Keys"]["ArrowLeft"]) || keyboard.isHeld(Input["Keys"]["A"]));
    component.keyboardPrimaryY = +(keyboard.isHeld(Input["Keys"]["ArrowDown"]) || keyboard.isHeld(Input["Keys"]["S"])) - +(keyboard.isHeld(Input["Keys"]["ArrowUp"]) || keyboard.isHeld(Input["Keys"]["W"]));
    component.keyboardSecondaryX = +keyboard.isHeld(Input["Keys"]["L"]) - +keyboard.isHeld(Input["Keys"]["J"]);
    component.keyboardSecondaryY = +keyboard.isHeld(Input["Keys"]["K"]) - +keyboard.isHeld(Input["Keys"]["I"]);
  }

  private updateGamepad(entity: Entity, delta: number): void {
    const component = entity.get(InputManagerComponent)!;
    const gamepad = this.engine.input.gamepads.at(0);
    component.gamepadPrimaryX = gamepad.getAxes(Input["Axes"]["LeftStickX"]);
    component.gamepadPrimaryY = gamepad.getAxes(Input["Axes"]["LeftStickY"]);
    component.gamepadSecondaryX = gamepad.getAxes(Input["Axes"]["RightStickX"]);
    component.gamepadSecondaryY = gamepad.getAxes(Input["Axes"]["RightStickY"]);
  }

  private updateButton(entity: Entity): void {
    const component = entity.get(InputManagerComponent)!;
    component.buttonPressed = this.buttonPressed;
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