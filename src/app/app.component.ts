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
