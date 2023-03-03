import { TELEGRAM, WEB_APP } from "@/constants";

export class BackButtonController {
  constructor({ route, router }) {
    this.route = route;
    this.router = router;
    this.button = window[TELEGRAM][WEB_APP].backButton;
  }

  static beforeEach(to) {
    if (to.name === "home" || to.name === "login") {
      this.hide();
    } else {
      this.show();
    }
  }

  static onClick() {
    this.backButton.onClick(() => this.handleOnClick());
  }

  static handleOnClick() {
    switch (this.route.name) {
      case "game":
      case "shop":
      case "news":
      case "daily":
      case "market":
      case "profile":
      case "premium":
      case "settings":
      case "bonus-prize":
      case "bonus-recent":
      case "bonus-active": {
        this.router.push({
          name: "home",
        });
        break;
      }
      default: {
        if (window.history.state.back) {
          this.router.go(-1);
        } else {
          if (this.route.name !== "home") {
            this.router.push({
              name: "home",
            });
          }
        }
      }
    }
  }

  async binding() {
    switch (this.route.name) {
      default: {
        this.router.go(-1);
      }
    }
  }

  show() {
    this.button.isVisible = true;
  }

  hide() {
    this.button.isVisible = false;
  }

  async push(name = "home", params = {}, query = {}) {
    await this.router.push({
      name,
      params,
      query,
    });
  }
}
