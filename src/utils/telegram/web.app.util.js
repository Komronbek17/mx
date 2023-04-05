import { entries } from "@/utils/object.util";

export class WebAppController {
  static webApp = null;
  static router = null;
  static route = null;

  static light = {
    "--gf-p-loader-color": "#037EE5",
    "--gf-p-loader-background": "rgba(9, 9, 9, 0.6)",
    "--gf-p-loader-spinner-background": "#fff",
    "--gf-p-primary-color": "#090909",
    "--gf-secondary-color-3": "#A3ABB8",
    "--gf-p-accent": "#F2FBFD",
    "--gf-p-gray-1": "#DBDBDB",
    "--gf-p-gray-2": "#797D81",
    "--gf-p-main-gray": "#F5F5F5",
    "--gf-p-background": "#181F27",
    "--gf-p-green": "#00CB6A",
    "--gf-p-navigation": "#181F27",
    "--gf-p-dark-accent": "#181F27",
    "--gf-p-main-gradient":
      "linear-gradient(107.32deg, #4ADAFF -22.08%, #0062CA 122.03%)",
    "--gf-p-yellow-1": "rgba(255, 199, 0, 0.15)",
    "--gf-p-yellow-gradient":
      "linear-gradient(122.82deg, #F2D207 0%, #FFA329 100%)",
    "--star-color0": "#0062CA",
    "--star-color1": "#FFA329",
    "--star-color2": "#00CB6A",
    "--star-opacity": "0.5",

    //  JAMSHID LIGHT
    "--gf-bg-main": "#FFFFFF",
    "--gf-accent-bg": "#F2FBFD",
    "--gf-text-09": "#090909",
    "--gf-text-00": "#000000",
    "--gf-text-33": "#333333",
    "--gf-text-gray": "#797D81",
    "--gf-text-white-2x": "#FFFFFF",
    "--gf-yellow-gradient":
      "linear-gradient(122.82deg, #F2D207 0%, #FFA329 100%)",
    "--gf-text-gray-2x": "#797D81",
    "--gf-text-secondary-gray": "#A3ABB8",
    "--gf-text-secondary-gray-2x": "#A3ABB8",
    "--gf-blue-gradient-01":
      "linear-gradient(180deg, #00BBF9 0%, #00A3FF 100%)",
    "--gf-blue-gradient-02":
      "linear-gradient(107.32deg, #4ADAFF -22.08%, #0062CA 122.03%)",
    "--gf-black-gradient":
      "linear-gradient(145.27deg, #313331 -5.05%, #181716 105.01%)",
    "--gf-green-gradient":
      "linear-gradient(142.74deg, #00FF85 -18.06%, #00B05C 110.27%)",
    "--gf-text-33-gray": "#333333",
    "--gf-hover-bg": "#F5F5F5",
    "--gf-text-blue": "#32A8E6",
    "--gf-input-text": "#DBDBDB",
    "--gf-input-border": "#DBDBDB",
    "--gf-disable-btn": "#F5F5F5",
    "--gf-form-btn-bg": "#DBDBDB",
    "--gf-notification-text-bg": "#EB5757",
    "--gf-exit-btn-bg": "rgba(235, 87, 87, 0.1)",
    "--gf-auth-input-bg": "rgba(255, 255, 255, 0.3)",
    "--gf-login-input-bg": "#F5F5F5",
    "--gf-login-input-text": "#333333",
    "--gf-choose-image-profile":"#F2FBFD"
  };

  static dark = {
    "--gf-p-loader-color": "#037EE5",
    "--gf-p-loader-background": "rgba(9, 9, 9,0.85)",
    "--gf-p-loader-spinner-background": "#151515",
    "--gf-p-primary-color": "#FFFFFF",
    "--gf-secondary-color-3": "#A3ABB8",
    "--gf-p-accent": "#F2FBFD",
    "--gf-p-gray-1": "#DBDBDB",
    "--gf-p-main-gray": "#F5F5F5",
    "--gf-p-gray-2": "#797D81",
    "--gf-p-background": "#181F27",
    "--gf-p-green": "#00CB6A",
    "--gf-p-navigation": "#181F27",
    "--gf-p-dark-accent": "#181F27",
    "--gf-p-main-gradient":
      "linear-gradient(107.32deg, #4ADAFF -22.08%, #0062CA 122.03%)",
    "--gf-p-yellow-gradient":
      "linear-gradient(122.82deg, #F2D207 0%, #FFA329 100%)",
    "--gf-p-yellow-1": "rgba(255, 199, 0, 0.15)",
    "--star-color0": "#0062CA",
    "--star-color1": "#FFA329",
    "--star-color2": "#00CB6A",
    "--star-opacity": "1",

    //  JAMSHID DARK
    "--gf-bg-main": "#181F27",
    "--gf-accent-bg": "#2F353D",
    "--gf-text-09": "#FFFFFF",
    "--gf-text-00": "#FFFFFF",
    "--gf-text-33": "#FFFFFF",
    "--gf-text-gray": "#FFFFFF",
    "--gf-text-white-2x": "#FFFFFF",
    "--gf-yellow-gradient":
      "linear-gradient(122.82deg, #F2D207 0%, #FFA329 100%)",
    "--gf-text-gray-2x": "#797D81",
    "--gf-text-secondary-gray": "#797D81",
    "--gf-text-secondary-gray-2x": "#A3ABB8",
    "--gf-blue-gradient-01":
      "linear-gradient(180deg, #00BBF9 0%, #00A3FF 100%)",
    "--gf-blue-gradient-02":
      "linear-gradient(107.32deg, #4ADAFF -22.08%, #0062CA 122.03%)",
    "--gf-black-gradient": "#FFFFFF",
    "--gf-green-gradient":
      "linear-gradient(142.74deg, #00FF85 -18.06%, #00B05C 110.27%)",
    "--gf-text-33-gray": "#797D81",
    "--gf-hover-bg": "#2F353D",
    "--gf-text-blue": "#32A8E6",
    "--gf-input-text": "#797D81",
    "--gf-input-border": "#DBDBDB",
    "--gf-disable-btn": "#2F353D",
    "--gf-form-btn-bg": "#2F353D",
    "--gf-notification-text-bg": "#EB5757",
    "--gf-exit-btn-bg": "rgba(235, 87, 87, 0.1)",
    "--gf-auth-input-bg": "#F5F5F5",
    "--gf-login-input-bg": "rgba(255, 255, 255, 0.3)",
    "--gf-login-input-text": "#FFFFFF",
    "--gf-choose-image-profile":"#2F353D"
  };

  static getInstance({ webApp, route, router }) {
    this.route = route;
    this.router = router;

    if (this.webApp === null) {
      this.webApp = webApp;
    }

    return {
      webApp: this.webApp,
    };
  }

  static ready() {
    this.webApp.ready();
  }

  static beforeEach() {
    this.setThemeStyle();
  }

  static showAlert(m, c) {
    this.webApp.showAlert(m, c);
  }

  static closingConfirmationEnable() {
    this.webApp.isClosingConfirmationEnabled = true;
  }

  static closingConfirmationDisable() {
    this.webApp.isClosingConfirmationEnabled = false;
  }

  static setHeaderColor(color) {
    this.webApp.setHeaderColor(color);
  }

  static setThemeStyle() {
    if (this.webApp.colorScheme === "dark") {
      document.getElementById("app").style.backgroundColor = "#181F27";
      this.webApp.themeParams.bg_color = "#181F27";
      this.webApp.setBackgroundColor("#181F27");
      document.documentElement.style.backgroundColor = "#181F27";
    } else if (
      this.webApp.colorScheme === "light" &&
      this.route.name === "basket"
    ) {
      document.getElementById("app").style.backgroundColor = "#F5F5F5";
      this.webApp.themeParams.bg_color = "#F5F5F5";
      this.webApp.setBackgroundColor("#F5F5F5");
      document.documentElement.style.backgroundColor = "#F5F5F5";
    } else if (
      // eslint-disable-next-line no-dupe-else-if
      this.webApp.colorScheme === "dark" &&
      this.route.name === "basket"
    ) {
      document.getElementById("app").style.backgroundColor = "#2A3139";
      this.webApp.themeParams.bg_color = "#2A3139";
      this.webApp.setBackgroundColor("#2A3139");
      document.documentElement.style.backgroundColor = "#2A3139";
    } else {
      document.getElementById("app").style.backgroundColor = "#FFFFFF";
      this.webApp.themeParams.bg_color = "#FFFFFF";
      this.webApp.setBackgroundColor("#FFFFFF");
    }

    setTimeout(() => {
      this.setHeaderColor(this.webApp.themeParams.bg_color);
    }, 250);
  }

  static setStyleVariable({ property, variable }) {
    const root = document.querySelector(":root");
    root.style.setProperty(property, variable);
  }

  static isDarkMode() {
    return this.webApp.colorScheme === "dark";
  }

  static setRootVariables() {
    const rootVariables = this.isDarkMode()
      ? entries(this.dark)
      : entries(this.light);

    for (let [property, variable] of rootVariables) {
      this.setStyleVariable({
        property,
        variable,
      });
    }
  }

  static checkAndroidDevice() {
    if (navigator) {
      return !!navigator.userAgent.includes("Android");
    }
  }
}
