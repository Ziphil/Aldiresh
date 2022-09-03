//

import {
  Color,
  Component,
  Entity,
  ExcaliburGraphicsContext,
  GraphicsComponent,
  System,
  SystemType,
  vec
} from "excalibur";


const ROTATING_SQUARE_COMPONENT_TYPE = "zp.rotatingSquare" as const;
const ROTATING_SQUARE_SYSTEM_TYPES = ["ex.graphics", "zp.rotatingSquare"] as const;

type RotatingSquareComponentConfigs = {
  outerSize: RotatingSquareComponent["outerSize"],
  innerSize?: RotatingSquareComponent["innerSize"],
  outerRotationVel: RotatingSquareComponent["outerRotationVel"],
  innerRotationVel?: RotatingSquareComponent["innerRotationVel"],
  outerColor: RotatingSquareComponent["outerColor"],
  innerColor?: RotatingSquareComponent["innerColor"],
  framed?: RotatingSquareComponent["framed"]
};


export class RotatingSquareComponent extends Component<typeof ROTATING_SQUARE_COMPONENT_TYPE> {

  public readonly type: any = ROTATING_SQUARE_COMPONENT_TYPE;
  public readonly outerSize: number;
  public readonly innerSize?: number;
  public readonly outerRotationVel: number;
  public readonly innerRotationVel?: number;
  public readonly outerColor: Color;
  public readonly innerColor?: Color;
  public readonly framed: boolean;
  public outerAngle: number;
  public innerAngle: number;
  public graphicsConfiged: boolean;

  public constructor(configs: RotatingSquareComponentConfigs) {
    super();
    this.outerSize = configs.outerSize;
    this.innerSize = configs.innerSize;
    this.outerRotationVel = configs.outerRotationVel;
    this.innerRotationVel = configs.innerRotationVel;
    this.outerColor = configs.outerColor;
    this.innerColor = configs.innerColor;
    this.framed = configs.framed ?? false;
    this.outerAngle = 0;
    this.innerAngle = 0;
    this.graphicsConfiged = false;
  }

}


export class RotatingSquareSystem extends System<RotatingSquareComponent | GraphicsComponent> {

  public readonly types: any = ROTATING_SQUARE_SYSTEM_TYPES;
  public readonly systemType: SystemType = SystemType["Update"];

  public override update(entities: Array<Entity>, delta: number): void {
    for (const entity of entities) {
      this.setupGraphics(entity);
      this.updateAngles(entity, delta);
    }
  }

  private setupGraphics(entity: Entity): void {
    const component = entity.get(RotatingSquareComponent)!;
    const graphicsComponent = entity.get(GraphicsComponent)!;
    if (!component.graphicsConfiged) {
      graphicsComponent.onPostDraw = function (context: ExcaliburGraphicsContext): void {
        const {outerAngle, innerAngle, outerSize, innerSize, outerColor, innerColor, framed} = component;
        context.save();
        context.rotate(outerAngle);
        if (framed) {
          context.drawRectangle(vec(-outerSize / 2, -outerSize / 2), outerSize, outerSize, Color["Transparent"], outerColor, 1);
        } else {
          context.drawRectangle(vec(-outerSize / 2, -outerSize / 2), outerSize, outerSize, outerColor);
        }
        context.rotate(-outerAngle);
        if (innerSize !== undefined && innerColor !== undefined) {
          context.rotate(innerAngle);
          if (framed) {
            context.drawRectangle(vec(-innerSize / 2, -innerSize / 2), innerSize, innerSize, Color["Transparent"], outerColor, 1);
          } else {
            context.drawRectangle(vec(-innerSize / 2, -innerSize / 2), innerSize, innerSize, innerColor);
          }
          context.rotate(-innerAngle);
        }
        context.drawRectangle(vec(0, 0), 1, 1, outerColor);
        context.restore();
      };
      component.graphicsConfiged = true;
    }
  }

  private updateAngles(entity: Entity, delta: number): void {
    const component = entity.get(RotatingSquareComponent)!;
    component.outerAngle += component.outerRotationVel * delta;
    if (component.innerRotationVel !== undefined) {
      component.innerAngle += component.innerRotationVel * delta;
    }
  }

}