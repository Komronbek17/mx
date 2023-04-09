import * as amplitude from "@amplitude/analytics-browser";
import { track } from "@amplitude/analytics-browser";

export class AmplitudeTracker {
  static initialize() {
    amplitude.init("c304134ab0ca312632e1d538cf3b7363", undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });
  }

  static lunch({
    message = "Free Chance Activated",
    properties: { platform = "Web", webapp_launched_at },
  }) {
    this.tracker(message, {
      properties: { platform, webapp_launched_at },
    });
  }

  static tracker(name, { properties }) {
    track(name, properties);
  }

  static signUpCompleted({
    message = "Sign Up Completed",
    properties: { user_id, phone_number, sign_up_at },
  }) {
    this.tracker(message, {
      properties: { user_id, phone_number, sign_up_at },
    });
  }

  static tryYourLuck({
    message = "Free Bonus Received",
    properties: { user_id, attempt_num },
  }) {
    this.tracker(message, {
      properties: { user_id, attempt_num },
    });
  }

  static activatePremium({
    message = "Premium Activated",
    properties: { user_id },
  }) {
    this.tracker(message, {
      properties: { user_id },
    });
  }

  static receivePayingBonus({
    message = "Paid Bonus Received",
    properties: { user_id, bonus_received = true },
  }) {
    this.tracker(message, {
      properties: { user_id, bonus_received },
    });
  }
}
