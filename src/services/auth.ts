import firebase from "firebase";

export class AuthService {

  public signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public logout() {
    return firebase.auth().signOut();
  }

  public getActiveUser() {
    return firebase.auth().currentUser;
  }

}
