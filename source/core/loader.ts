//

import {
  Loadable,
  Loader
} from "excalibur";


export class AldireshLoader extends Loader {

  public constructor(loadables?: Array<Loadable<any>>) {
    super(loadables);
    this.suppressPlayButton = true;
  }

  public override draw(context: CanvasRenderingContext2D): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const barHeight = height * 0.01;
    const barMargin = height * 0.005;
    const fontSize = height * 0.03;
    const progress = this.progress;
    context.save();
    context.imageSmoothingEnabled = false;
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#FFFFFF";
    context.textBaseline = "bottom";
    context.textAlign = "center";
    context.font = `${fontSize}px sans-serif`;
    context.rect(width * 0.1, (height - barHeight) / 2, width * progress * 0.8, barHeight);
    context.fill();
    context.rect(width * 0.1 - barMargin, (height - barHeight) / 2 - barMargin, width * 0.8 + barMargin * 2, barHeight + barMargin * 2);
    context.stroke();
    context.fillText("Loading", width / 2, height / 2 - fontSize);
    context.restore();
  }

}