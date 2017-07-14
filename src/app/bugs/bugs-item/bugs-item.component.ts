import { ElementRef, Component, OnInit, Input, Output, EventEmitter, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'bugs-item',
  templateUrl: './bugs-item.component.html',
  styleUrls: ['./bugs-item.component.css']
})
export class BugsItemComponent implements OnInit, AfterViewInit {
  @ViewChild('t1') t1;
  @ViewChild('t2') t2;
  @Input() bug;
  @Input() index;
  @Output() itemUpdateEvent: EventEmitter<any> = new EventEmitter();
  @Output() itemDeleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() itemEditEvent: EventEmitter<any> = new EventEmitter();
  @Output() itemCancelEvent: EventEmitter<any> = new EventEmitter();
  private _element: any;
  @Input() isThisUserEditable: boolean = false;
  @Input() isThisUserDisabled: boolean = false;

  @Output() itemThisUserEditEvent: EventEmitter<any> = new EventEmitter();
  @Input() currentUid: string;
  constructor(private zone: NgZone, elementRef: ElementRef) {


    this._element = elementRef.nativeElement;

    this.itemEditEvent.subscribe((arg) => {



      // console.log("arg....................", arg)
      // setTimeout(() => {

      //   console.log("this._element", this._element)



      //   // let el = this.t1.nativeElement;
      //   // console.log("el", el)
      //   // if (this.t1 != undefined) {
      //   //   let el = this.t1.nativeElement;
      //   //   console.log("el", el)
      //   //   let cells = el.getElementsByTagName("td");
      //   //   console.log("cells", cells)
      //   //   for (var i = 0; i < cells.length; i++) {
      //   //     // cells[i].style.backgroundColor = "white";
      //   //     // console.log(cells[i].style.backgroundColor)

      //   //     var inputs = cells[i].getElementsByTagName("input");
      //   //     console.log("inputs", inputs)
      //   //     for (var j = 0; j < inputs.length; j++) {
      //   //       if (inputs[j] != null) {
      //   //         inputs[j].disabled = false;
      //   //         console.log("inputs[j].disabled = false", inputs[j].disabled)
      //   //       }
      //   //     }

      //   //     var buttons = cells[i].getElementsByTagName("button");
      //   //     for (var j = 0; j < buttons.length; j++) {
      //   //       buttons[j].disabled = false;
      //   //     }
      //   //   }

      //   // }
      //   console.log("setTimeout")
      // }, 5000, arg);




    });
  }

  ngOnInit() {



  }

  ngAfterViewInit(): void {

    console.log("ngAfterViewInit-------------------------------------------------------------")
    if (this.t1 != undefined) { this._element = this.t1.nativeElement; }
    if (this.t2 != undefined) { this._element = this.t2.nativeElement; }
    console.log("t1", this.t1)
    console.log("t2", this.t2)
    console.log("this._element", this._element)
        console.log("this.currentUid", this.currentUid)

    

    // let cells = this._element.getElementsByTagName("td");

    // console.log("cells", cells)
    // for (var i = 0; i < cells.length; i++) {
    //   cells[i].style.backgroundColor = "green";
    //   console.log(cells[i].style.backgroundColor)

    //   var inputs = cells[i].getElementsByTagName("input");
    //   console.log("inputs", inputs)
    //   for (var j = 0; j < inputs.length; j++) {
    //     if (inputs[j] != null) {
    //       inputs[j].disabled = false;
    //       console.log("inputs[j].disabled = false", inputs[j].disabled)
    //     }
    //   }

    //   var buttons = cells[i].getElementsByTagName("button");
    //   for (var j = 0; j < buttons.length; j++) {
    //     buttons[j].disabled = false;
    //   }
    // }



    // if (this.t2 != undefined){
    //     var cells = this.t2._element.getElementsByTagName("td");
    //         console.log("cells", cells)

    // }

  }

  getStyle() {

    return "green";

  }
  ClickIt() {
    var cells = this._element.getElementsByTagName("td");
    console.log("cells", cells)
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "white";
      // console.log(cells[i].style.backgroundColor)

      var inputs = cells[i].getElementsByTagName("input");
      console.log("inputs", inputs)
      for (var j = 0; j < inputs.length; j++) {
        if (inputs[j] != null) {
          inputs[j].disabled = false;
          console.log("inputs[j].disabled = false", inputs[j].disabled)
        }
      }

      var buttons = cells[i].getElementsByTagName("button");
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].disabled = false;
      }
    }
  }
  editBug(bug) {

    console.log("editBug", bug)


    bug.isEditable = true;
    bug.origProblem = bug.problem;
    bug.origResponse = bug.response;
    bug.isDisabled = true;
    bug.editColor = "red";
    // bug.ti1 = this.t1;
    // bug.ti2 = this.t2;
    // bug.isThisUserEditable = true;
    let b = { bug: bug };
    this.itemEditEvent.emit(b);

    // this.itemThisUserEditEvent.emit({ isThisUserEditable: true });


    // console.log("bug.isThisUserEditable", bug.isThisUserEditable)
    // console.log("t1", this.t1)
    // console.log("t2", this.t2)




    this.zone.run(() => {
    });

    // setTimeout(() => {
    //   console.log("setTimeout-------------------------------------------------------------")
    //   let el = this._element;
    //   console.log("el", el)
    //   let cells = el.getElementsByTagName("td");
    //   console.log("cells", cells)
    //   for (var i = 0; i < cells.length; i++) {
    //     // cells[i].style.backgroundColor = "white";
    //     // console.log(cells[i].style.backgroundColor)

    //     var inputs = cells[i].getElementsByTagName("input");
    //     console.log("inputs", inputs)
    //     for (var j = 0; j < inputs.length; j++) {
    //       if (inputs[j] != null) {
    //         inputs[j].disabled = false;
    //         console.log("inputs[j].disabled = false", inputs[j].disabled)
    //       }
    //     }

    //     var buttons = cells[i].getElementsByTagName("button");
    //     for (var j = 0; j < buttons.length; j++) {
    //       buttons[j].disabled = false;
    //     }
    //   }
    //   console.log("setTimeout")
    // }, 5000);

    // setTimeout(() => {
    //   bug.isDisabled = false;
    //   bug.editColor = "green";
    //   this.zone.run(() => {
    //   });
    // console.log("setTimeout")
    // }, 5000);


  }

  cancelBug(bug) {

    bug.isEditable = false;
    bug.problem = bug.origProblem;
    bug.response = bug.origResponse;

    var b = { bug: bug };
    this.itemCancelEvent.emit(b)
  }

  updateBug(bug: any) {
    bug.isEditable = false;
    var b = { bug: bug };
    this.itemUpdateEvent.emit(b)
  }

  deleteBug(bug: any): void {
    var b = { bug: bug };
    this.itemDeleteEvent.emit(b)
  }

  private handleError(error) {
    console.log(error)
  }



}
