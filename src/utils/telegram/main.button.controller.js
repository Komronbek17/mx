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
}
