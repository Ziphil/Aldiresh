//

import {
  ImageSource,
  SpriteFont,
  SpriteSheet
} from "excalibur";


export const ASSETS = {
  number: new ImageSource("/asset/image/number.png"),
  statusBackground: new ImageSource("/asset/image/status-background.png"),
  statusFrame: new ImageSource("/asset/image/status-frame.png")
};

export const SPRITE_FONTS = {
  number: new SpriteFont({
    spriteSheet: SpriteSheet.fromImageSource({image: ASSETS.number, grid: {rows: 1, columns: 14, spriteWidth: 11, spriteHeight: 10}}),
    alphabet: "0123456789+-±.",
    spacing: 2
  })
};