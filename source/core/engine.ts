//

import {
  DevTool
} from "@excaliburjs/dev-tools";
import {
  Color,
  DisplayMode,
  Engine,
  Loader
} from "excalibur";
import {
  ASSETS
} from "/source/core/asset";
import {
  SCREEN_CONFIGS
} from "/source/core/constant";
import {
  MainScene
} from "/source/scene/main-scene";


export class AldireshEngine extends Engine {

  public constructor() {
    super({
      resolution: {width: SCREEN_CONFIGS.width, height: SCREEN_CONFIGS.height},
      displayMode: DisplayMode["FitScreen"],
      canvasElementId: "screen",
      backgroundColor: Color.fromHex("#000000"),
      antialiasing: false,
      suppressHiDPIScaling: true
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

  public async run(): Promise<void> {
    const loader = new Loader(Object.values(ASSETS));
    await this.start(loader);
  }

}


const engine = new AldireshEngine();
engine.run();