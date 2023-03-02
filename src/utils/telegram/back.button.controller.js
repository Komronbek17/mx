export class BackButtonController {
  static backButton = null;
  static route = null;
  static router = null;

  static getInstance({ button = null, route, router }) {
    if (this.backButton === null) {
      this.backButton = button;
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
      backButton: this.backButton,
    };
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
      case "premium":
      case "settings":
      case "market":
      case "profile":
      case "game":
      case "shop":
      case "news":
      case "daily":
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

  static async binding() {
    switch (this.route.name) {
      default: {
        this.router.go(-1);
      }
    }
  }

  static show() {
    this.backButton.isVisible = true;
  }

  static hide() {
    this.backButton.isVisible = false;
  }

  static async push(name = "home", params = {}, query = {}) {
    await this.router.push({
      name,
      params,
      query,
    });
  }
}
