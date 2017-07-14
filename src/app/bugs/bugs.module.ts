
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BugsListComponent } from './bugs-list/bugs-list.component';
import { BugsItemComponent } from './bugs-item/bugs-item.component';
import { BugsFormComponent } from './bugs-form/bugs-form.component';
import { ReactiveFormsModule }          from '@angular/forms';

@NgModule({
    declarations: [
        BugsListComponent,
        BugsItemComponent,
        BugsFormComponent

    ],
    exports: [BugsListComponent, BugsItemComponent, BugsFormComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule

    ],
    providers: [],
})
export class BugsModule { }
