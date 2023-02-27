import { TELEGRAM, WEB_APP } from "@/constants";

export class MainButtonController {
  constructor({ route, router }) {
    this.route = route;
    this.router = router;
  }

  onClick() {
    switch (this.route.name) {
      case "home": {
        this.router.push({
          name: "premium",
        });
      }
    }
  }

  mainButtonOnClick(callback) {
    window[TELEGRAM][WEB_APP].MainButton["onClick"](callback);
  }

  mainButtonOffClick(callback) {
    window[TELEGRAM][WEB_APP].MainButton["offClick"](callback);
  }

  mainButtonActivate() {
    window[TELEGRAM][WEB_APP].MainButton.isActive = true;
  }

  mainButtonDeactivate() {
    window[TELEGRAM][WEB_APP].MainButton.isActive = false;
  }

  mainButtonMakeVisible() {
    window[TELEGRAM][WEB_APP].MainButton.isVisible = true;
  }

  mainButtonMakeDisable() {
    window[TELEGRAM][WEB_APP].MainButton.isVisible = false;
  }

  mainButtonSetText(text) {
    window[TELEGRAM][WEB_APP].MainButton.setText(text);
  }

  mainButtonShowProgress() {
    window[TELEGRAM][WEB_APP].MainButton.showProgress(true);
  }

  mainButtonHideProgress() {
    window[TELEGRAM][WEB_APP].MainButton.hideProgress();
  }
}
