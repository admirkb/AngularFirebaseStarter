import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';


  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.items = db.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;

  }

  // loginGoogle() {
  //   this.af.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Popup,
  //   }).then(
  //       (success) => {
  //       this.router.navigate(['/members']);
  //     }).catch(
  //       (err) => {
  //       this.error = err;
  //     })
  // }
  loginGoogle() {

    console.log("loginPassword")
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log("user", user)

      this.user.displayName = user.displayName;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
  }

  loginFacebook() {

    console.log("loginPassword")
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
  }

  loginGithub() {

    console.log("loginPassword")
    var provider = new firebase.auth.GithubAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
  }

  loginTwitter() {

    console.log("loginPassword")
    var provider = new firebase.auth.TwitterAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
  }

  loginEmail() {

    console.log("loginPassword")
    var provider = new firebase.auth.EmailAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
  }
  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Send(desc: string) {
    this.items.push({ message: desc, problem: desc })
      .catch(error => this.handleError(error))

    this.msgVal = '';
  }

  Info(e: any, x: any) {
    console.dir(e)
    console.dir(x)
  }
  updateItem(key: string, problem: any): void {

    this.items.update(key, { problem: problem })
      .catch(error => this.handleError(error))

    // let updates = {};
    // updates['/messages/' + key  ] = { problem: problem };
    // firebase.database().ref().update(updates);
  }

  deleteItem(key: string): void {
    this.items.remove(key)
      .catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.items.remove()
      .catch(error => this.handleError(error))
  }
  private handleError(error) {
    console.log(error)
  }
}
