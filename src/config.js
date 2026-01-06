export const CONFIG = {
  dist: 15,
  camera: {
    fov: 40,
    near: 1,
    far: 1000,
    initialZ: 15
  },
  mouse: {
    initialX: 30,
    initialY: 30
  },
  colors: {
    raycastColor: 0xff0000,
    pointDefault: 0xe5383b, // From point.js
    pointWhite: 0xffffff,   // From point.js
    stickDefault: 0xAEAEAE, // From stick.js
    pointMaterial: 0xffffff // From InstancePoint.js
  },
  physics: {
    bounce: 0.9,
    gravity: -4,
    friction: 0.999,
    timeStep: 1/5,
    subSteps: 3,
    gMultiplier: 1000/30
  },
  grid: {
    xOffsetRatio: 1/20,
    yOffsetUpRatio: 1/20,
    yOffsetDownRatio: 1/5,
    pointRadius: 0.14,
    stickWidthRatio: 0.6,
    largeCanvas: {
      threshold: 22,
      yOffsetDownRatio: 1/3,
      xNumber: 11,
      yNumber: 8,
      locked: [0, 5, 10]
    },
    mediumCanvas: { // implied from logic
       yOffsetDownRatio: 1/4,
       xNumber: 9,
       yNumber: 8,
       locked: [0, 4, 8]
    },
    // Default fallback if not large or whatever logic (though the code seems to accumulate lockedPos)
  },
  instance: {
    pointGeometryRadius: 16,
    stickZOffset: -0.01,
    stickScaleX: 1,
    stickScaleZ: 1
  }
};
