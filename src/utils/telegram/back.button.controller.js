import { TELEGRAM, WEB_APP } from "@/constants";

export class BackButtonController {
  constructor({ route, router }) {
    this.route = route;
    this.router = router;
    this.button = window[TELEGRAM][WEB_APP].backButton;
  }

  static beforeEach(to) {
    if (to.name === "home") {
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
      default: {
        this.router.go(-1);
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
