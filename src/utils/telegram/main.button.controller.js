export class MainButtonController {
  static mainButton = null;
  static route = null;
  static router = null;

  static getInstance({ button = null, route, router }) {
    if (this.mainButton === null) {
      this.mainButton = button;
    }

    if (this.route === null) {
      this.route = route;
    }

    if (this.router === null) {
      this.router = router;
    }

    return {
      route: this.route,
      router: this.router,
      mainButton: this.mainButton,
    };
  }

  static onClick(fn) {
    this.mainButton.onClick(fn);
  }

  static offClick(fn) {
    this.mainButton.offClick(fn);
  }

  static run() {
    this.activate();
    this.makeEnable();
    this.makeVisible();
    this.hideProgress();
  }

  static activate() {
    this.mainButton.isActive = true;
  }

  static deactivate() {
    this.mainButton.isActive = false;
  }

  static makeVisible() {
    this.mainButton.isVisible = true;
  }

  static makeInvisible() {
    this.mainButton.isVisible = false;
  }

  static makeEnable() {
    this.mainButton.enable();
  }

  static makeDisable() {
    this.mainButton.disable();
  }

  static setText(text) {
    this.mainButton.setText(text);
  }

  static showProgress() {
    this.mainButton.showProgress(true);
  }

  static hideProgress() {
    this.mainButton.hideProgress();
  }

  static setTextColor(color) {
    this.mainButton.textColor = color;
  }

  static setBackgroundColor(color) {
    this.mainButton.color = color;
  }

  static resetButtonDesign() {
    this.setTextColor("#FFFFFF");
    this.setBackgroundColor("#2e87ca");
  }
}
