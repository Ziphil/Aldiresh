//

import {
  ImageSource,
  SpriteFont,
  SpriteSheet
} from "excalibur";


export const ASSETS = {
  char: new ImageSource("asset/image/char.png"),
  smallNumber: new ImageSource("asset/image/small-number.png"),
  buttonFrame: new ImageSource("asset/image/button-frame.png"),
  statusName: new ImageSource("asset/image/status-name.png"),
  statusBackground: new ImageSource("asset/image/status-background.png"),
  statusFrame: new ImageSource("asset/image/status-frame.png"),
  logo: new ImageSource("asset/image/logo.png")
};

export const SPRITE_SHEETS = {
  char: SpriteSheet.fromImageSourceWithSourceViews({
    image: ASSETS.char,
    sourceViews: [
      ...Array.from({length: 7}).map((dummy, index) => ({x: index * 11, y: 0, width: 11, height: 10})),
      ...Array.from({length: 7}).map((dummy, index) => ({x: index * 11, y: 10, width: 11, height: 10})),
      ...Array.from({length: 7}).map((dummy, index) => ({x: index * 11, y: 20, width: 11, height: 10})),
      ...Array.from({length: 6}).map((dummy, index) => ({x: index * 11, y: 30, width: 11, height: 10})),
      ...Array.from({length: 5}).map((dummy, index) => ({x: index * 11, y: 40, width: 11, height: 10})),
      ...Array.from({length: 5}).map((dummy, index) => ({x: index * 11, y: 50, width: 11, height: 10})),
      ...Array.from({length: 3}).map((dummy, index) => ({x: index * 11, y: 60, width: 11, height: 10})),
      {x: 33, y: 60, width: 4, height: 10}
    ]
  }),
  smallNumber: SpriteSheet.fromImageSourceWithSourceViews({
    image: ASSETS.smallNumber,
    sourceViews: [
      ...Array.from({length: 10}).map((dummy, index) => ({x: index * 7, y: 0, width: 7, height: 6})),
      {x: 70, y: 0, width: 2, height: 6}
    ]
  }),
  buttonFrame: SpriteSheet.fromImageSourceWithSourceViews({
    image: ASSETS.buttonFrame,
    sourceViews: [
      ...Array.from({length: 8}).flatMap((dummy, index) => [
        {x: 0, y: index * 18, width: index * 13 + 51, height: 18},
        {x: 142, y: index * 18, width: index * 13 + 51, height: 18}
      ])
    ]
  }),
  statusName: SpriteSheet.fromImageSource({
    image: ASSETS.statusName,
    grid: {rows: 12, columns: 1, spriteWidth: 39, spriteHeight: 13}
  })
};

export const SPRITE_FONTS = {
  char: new SpriteFont({
    spriteSheet: SPRITE_SHEETS.char,
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789+-±.",
    spacing: 2,
    caseInsensitive: true
  }),
  smallNumber: new SpriteFont({
    spriteSheet: SPRITE_SHEETS.smallNumber,
    alphabet: "0123456789.",
    spacing: 1
  })
};