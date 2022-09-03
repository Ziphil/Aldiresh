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
  SCREEN_CONFIGS
} from "/source/constant";
import {
  MainScene
} from "/source/scene/main-scene";


export class MyEngine extends Engine {

  public constructor() {
    super({
      width: SCREEN_CONFIGS.width,
      height: SCREEN_CONFIGS.height,
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
    if (document.location.hash === "#debug") {
      const devtool = new DevTool(this);
    }
  }

  public run(): void {
    this.start();
  }

}


const engine = new MyEngine();
engine.run();