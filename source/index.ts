//

import {
  DevTool
} from "@excaliburjs/dev-tools";
import {
  Color,
  DisplayMode,
  Engine
} from "excalibur";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH
} from "/source/constant";
import {
  MainScene
} from "./stage/main-scene";


export class MyEngine extends Engine {

  public constructor() {
    super({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      displayMode: DisplayMode["FitScreen"],
      canvasElementId: "screen",
      backgroundColor: Color.fromHex("#000000"),
      antialiasing: false
    });
    this.setupScenes();
    this.setupDevTool();
  }

  private setupScenes(): void {
    this.add("main", new MainScene());
    this.goToScene("main");
  }

  private setupDevTool(): void {
    const devtool = new DevTool(this);
  }

  public run(): void {
    this.start();
  }

}


const engine = new MyEngine();
engine.run();