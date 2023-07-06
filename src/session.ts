export default class Session {
  static instance: any;
  session: any = {};

  constructor() {}
  init() {
    if (Session.instance) {
      return Session.instance;
    }
    Session.instance = this;
  }

  createSession(email: string, otp: string) {
    if (!this.session[email]) {
      this.session[email] = {
        email: email,
        otp: otp,
        count: 0,
        verified: false,
      };
    }
  }
}
