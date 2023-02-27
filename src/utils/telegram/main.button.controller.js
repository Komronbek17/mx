import { TELEGRAM, WEB_APP } from "@/constants";

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

  static mainButtonOnClick(callback) {
    window[TELEGRAM][WEB_APP].MainButton["onClick"](callback);
  }

  static mainButtonOffClick(callback) {
    this.mainButton["offClick"](callback);
  }

  static mainButtonActivate() {
    this.mainButton.isActive = true;
  }

  static mainButtonDeactivate() {
    this.mainButton.isActive = false;
  }

  static mainButtonMakeVisible() {
    this.mainButton.isVisible = true;
  }

  static mainButtonMakeDisable() {
    this.mainButton.isVisible = false;
  }

  static mainButtonSetText(text) {
    this.mainButton.setText(text);
  }

  static mainButtonShowProgress() {
    this.mainButton.showProgress(true);
  }

  static mainButtonHideProgress() {
    this.mainButton.hideProgress();
  }
}
