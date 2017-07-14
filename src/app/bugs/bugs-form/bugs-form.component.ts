import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bugs-form',
  templateUrl: './bugs-form.component.html',
  styleUrls: ['./bugs-form.component.css']
})
export class BugsFormComponent implements OnInit {
  @Output() itemAddEvent: EventEmitter<any> = new EventEmitter();
  public form = this.fb.group({
    dateCreated: new Date(),
    problem: ["", Validators.required],
    editColor: "transparent",
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }

  private onSubmit(e) {


    var bug = this.form.value;
    this.itemAddEvent.emit(bug)
    this.form.reset();

  }

}
