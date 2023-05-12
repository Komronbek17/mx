import { hasOwnProperty } from "@/utils/object.util";
import { isNUNEZ } from "@/utils/inspect.util";

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
    const name = this.route.name;
    const pages = {
      game: "home",
      shop: "home",
      news: "home",
      daily: "home",
      market: "home",
      profile: "home",
      premium: "home",
      settings: "home",
      monitoring: "home",

      "bonus-prize": "home",
      "bonus-recent": "home",
      "bonus-active": "home",

      "settings-language": "settings",
      "settings-sound": "settings",
      "settings-unsubscribe": "settings",

      "market-basket": "market",
      "market-checkout": "market-basket",

      "checkout-address-create": "market-checkout",
      "checkout-address-update": "market-checkout",
      "checkout-client-create": "market-checkout",
      "checkout-client-update": "market-checkout",

      "market-ordered-successfully": "market",
    };

    const hasInPagesList = hasOwnProperty(pages, name);
    if (hasInPagesList && isNUNEZ(pages[name])) {
      this.router.push({
        name: pages[name],
      });
    } else {
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
