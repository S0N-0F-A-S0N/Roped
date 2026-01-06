import { Pane } from 'tweakpane';

export class UI {
  constructor(config) {
    this.config = config;
    this.pane = new Pane();
    this.build(this.pane, this.config);
  }

  build(parent, obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        // Skip arrays as they don't map cleanly to simple controls
        if (Array.isArray(value)) {
          continue;
        }

        if (typeof value === 'object' && value !== null) {
          const folder = parent.addFolder({ title: key });
          this.build(folder, value);
        } else {
          // Add binding for primitive values
          // Tweakpane auto-detects colors if the string matches hex format
          parent.addBinding(obj, key);
        }
      }
    }
  }
}
