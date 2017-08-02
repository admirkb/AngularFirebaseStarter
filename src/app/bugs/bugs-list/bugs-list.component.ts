import { Component, OnInit, NgZone, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
@Component({
  selector: 'bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.css']
})
export class BugsListComponent implements OnInit {
  bugs: FirebaseListObservable<any[]>;
  @Input() user: Observable<firebase.User>;
  private currentUid: string = '';
  private xxxx: boolean = false;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, private zone: NgZone) {

    this.bugs = db.list('/messages', {
      query: {
        limitToLast: 50,
      },
    });


  }

  private itemThisUserEditEvent(e) {

    console.log("e", e);
    this.xxxx = e.isThisUserEditable
  }
  ngOnInit() {
    this.user.subscribe((e) => {
      if (e !== null) {
        console.log("this.user.subscribe", e.uid);
        this.currentUid = e.uid;
        console.log("this.user.subscribe", this.currentUid);
      }
    })
  }

  private itemEditEvent(e) {
    console.log("itemEditEvent", e);
    // this.updateItem(e.bug.$key, e.bug)

    this.bugs.update(e.bug.$key,
      {
        editColor: e.bug.editColor,
        isDisabled: true,
        isEditable: true,
        currentUid: this.currentUid,

      })
      // .catch((err) => { console.log(err.message) })
      .then(() => {
        // console.log("e.bug.isThisUserEditable", e.bug.isThisUserEditable)
        console.log("Finished edit", this.bugs)
        console.log("Finished edit", this.currentUid)

        this.zone.run(() => {
        });
      });

    // this.isThisUserEditable = true;

  }

  private itemCancelEvent(e) {
    console.log("itemCancelEvent", e);

    this.bugs.update(e.bug.$key,
      {
        editColor: 'transparent',
        isDisabled: false,
        isEditable: false,
        origResponse: e.bug.origResponse,
        origProblem: e.bug.origProblem,
      })
      .then(() => {
        console.log("Finished cancel", this.bugs)
      });

  }
  private itemUpdateEvent(e) {
    console.dir(e)
    if (e.bug.response != '') {
      e.bug.dateResolved = new Date().getTime();
    }

    this.bugs.update(e.bug.$key,
      {
        editColor: 'transparent',
        isDisabled: false,
        isEditable: false,
        origResponse: e.bug.origResponse,
        origProblem: e.bug.origProblem,
        problem: e.bug.problem,
        response: e.bug.response,
        dateResolved: e.bug.dateResolved
      })
      .then(() => {
        console.log("Finished update", this.bugs)

      });

  }

  private itemDeleteEvent(e) {
    console.dir(e)
    this.deleteBug(e.bug.$key)

  }

  itemAddEvent(e) {

    this.newBug(e);


  }
  updateItem(key: string, bug: any): void {

    // if (bug.response != '') {
    //   bug.dateResolved = new Date().getTime();
    // }
    // this.bugs.update(key, { editColor: bug.editColor, isDisabled: bug.isDisabled, origResponse: bug.origResponse, origProblem: bug.origProblem, isEditable: bug.isEditable, problem: bug.problem, response: bug.response, dateResolved: bug.dateResolved })
    //   .then(() => {
    //     console.log("Finished update", this.bugs)
    //     // b.isDisabled = false;
    //     // b.editColor = "yellow";

    //   })
    //   .catch(error => this.handleError(error))

    // let updates = {};
    // updates['/messages/' + key  ] = { problem: problem };
    // firebase.database().ref().update(updates);
  }

  deleteBug(key: string): void {
    this.bugs.remove(key)
      .catch(error => this.handleError(error))
  }

  newBug(bug: any) {

    bug.dateCreated = new Date().getTime();
    bug.response = ''
    bug.dateResolved = '';
    bug.isDisabled = '';
    bug.origResponse = '';
    bug.origProblem = '';
    bug.editColor = 'transparent';
    bug.currentUid = '';





    this.bugs.push(bug)
      .catch(error => this.handleError(error))
  }
  private handleError(error) {
    console.log(error)
  }
}
