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
  ASSETS
} from "/source/core/asset";
import {
  SCREEN_PROPS
} from "/source/core/constant";
import {
  AldireshLoader
} from "/source/core/loader";
import {
  MainScene
} from "/source/scene/main-scene";


export class AldireshEngine extends Engine {

  public constructor() {
    super({
      resolution: {width: SCREEN_PROPS.width, height: SCREEN_PROPS.height},
      displayMode: DisplayMode["FitContainer"],
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
    const loader = new AldireshLoader(Object.values(ASSETS));
    await this.start(loader);
  }

}