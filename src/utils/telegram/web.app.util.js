export class WebAppController {
  static webApp = null;
  static getInstance({ webApp }) {
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

  static showAlert(m, c) {
    this.webApp.showAlert(m, c);
  }

  static closingConfirmationEnable() {
    this.webApp.isClosingConfirmationEnabled = true;
  }

  static closingConfirmationDisable() {
    this.webApp.isClosingConfirmationEnabled = false;
  }
}
