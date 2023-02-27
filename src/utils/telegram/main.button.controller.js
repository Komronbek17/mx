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

  static onClick() {
    switch (this.route.name) {
      case "home": {
        this.router.push({
          name: "premium",
        });
      }
    }
  }

  static mainButtonOnClick(callback) {
    window[TELEGRAM][WEB_APP].MainButton["onClick"](callback);
  }

  static mainButtonOffClick(callback) {
    window[TELEGRAM][WEB_APP].MainButton["offClick"](callback);
  }

  static mainButtonActivate() {
    window[TELEGRAM][WEB_APP].MainButton.isActive = true;
  }

  static mainButtonDeactivate() {
    window[TELEGRAM][WEB_APP].MainButton.isActive = false;
  }

  static mainButtonMakeVisible() {
    window[TELEGRAM][WEB_APP].MainButton.isVisible = true;
  }

  static mainButtonMakeDisable() {
    window[TELEGRAM][WEB_APP].MainButton.isVisible = false;
  }

  static mainButtonSetText(text) {
    window[TELEGRAM][WEB_APP].MainButton.setText(text);
  }

  static mainButtonShowProgress() {
    window[TELEGRAM][WEB_APP].MainButton.showProgress(true);
  }

  static mainButtonHideProgress() {
    window[TELEGRAM][WEB_APP].MainButton.hideProgress();
  }
}
