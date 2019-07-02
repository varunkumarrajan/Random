import dbFactory from "../../src/database/dbFactory";

const AuthGuard = {
  isAuthenticated: false,
  authenticate(cb) {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails && userDetails.user && userDetails.user.uid !== "") {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    localStorage.clear();
    const db = dbFactory.create("firebase");
    db.auth().signOut();
    setTimeout(cb, 100); // fake async
  }
};
AuthGuard.authenticate();
export default AuthGuard;
