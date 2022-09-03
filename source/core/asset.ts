//

import {
  ImageSource,
  SpriteFont,
  SpriteSheet
} from "excalibur";


export const ASSETS = {
  number: new ImageSource("/asset/image/number.png"),
  statusName: new ImageSource("/asset/image/status-name.png"),
  statusBackground: new ImageSource("/asset/image/status-background.png"),
  statusFrame: new ImageSource("/asset/image/status-frame.png")
};

export const SPRITE_SHEETS = {
  number: SpriteSheet.fromImageSourceWithSourceViews({
    image: ASSETS.number,
    sourceViews: [
      {x: 0, y: 0, width: 11, height: 10},
      {x: 11, y: 0, width: 11, height: 10},
      {x: 22, y: 0, width: 11, height: 10},
      {x: 33, y: 0, width: 11, height: 10},
      {x: 44, y: 0, width: 11, height: 10},
      {x: 55, y: 0, width: 11, height: 10},
      {x: 66, y: 0, width: 11, height: 10},
      {x: 77, y: 0, width: 11, height: 10},
      {x: 88, y: 0, width: 11, height: 10},
      {x: 99, y: 0, width: 11, height: 10},
      {x: 110, y: 0, width: 11, height: 10},
      {x: 121, y: 0, width: 11, height: 10},
      {x: 132, y: 0, width: 11, height: 10},
      {x: 143, y: 0, width: 4, height: 10}
    ]
  }),
  statusName: SpriteSheet.fromImageSource({
    image: ASSETS.statusName,
    grid: {rows: 12, columns: 1, spriteWidth: 39, spriteHeight: 13}
  })
};

export const SPRITE_FONTS = {
  number: new SpriteFont({
    spriteSheet: SPRITE_SHEETS.number,
    alphabet: "0123456789+-±.",
    spacing: 2
  })
};