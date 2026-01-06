import { Pane } from 'tweakpane';

export class UI {
  constructor(config) {
    this.config = config;
    this.pane = new Pane();
    this.build();
  }

  build() {
    const physicsFolder = this.pane.addFolder({ title: 'Physics' });
    physicsFolder.addBinding(this.config.physics, 'bounce', { min: 0, max: 1 });
    physicsFolder.addBinding(this.config.physics, 'gravity', { min: -20, max: 20 });
    physicsFolder.addBinding(this.config.physics, 'friction', { min: 0.9, max: 1 });
    physicsFolder.addBinding(this.config.physics, 'timeStep', { min: 0.01, max: 1 });
    physicsFolder.addBinding(this.config.physics, 'subSteps', { min: 1, max: 10, step: 1 });

    const cameraFolder = this.pane.addFolder({ title: 'Camera' });
    cameraFolder.addBinding(this.config.camera, 'fov', { min: 10, max: 100 });

    // Add more bindings as needed
    const gridFolder = this.pane.addFolder({ title: 'Grid Settings' });
    gridFolder.addBinding(this.config.grid, 'pointRadius', { min: 0.01, max: 0.5 });
  }
}
