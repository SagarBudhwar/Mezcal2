import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {GMapModule} from 'primeng/gmap';
import {TableModule } from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar'
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ChipsModule} from 'primeng/chips'
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {TreeTableModule} from 'primeng/treetable';

@NgModule({
  declarations: [
  ],
  providers: [
    ConfirmationService
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    PanelModule,
    TreeTableModule,
    TabViewModule,
    AutoCompleteModule,
    TableModule,
    FormsModule,
    CheckboxModule,
    ChipsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    DialogModule,
    RadioButtonModule,
    FileUploadModule,
    ReactiveFormsModule,
    ChartModule,
    GMapModule,
    CalendarModule,
    DynamicDialogModule,
    SelectButtonModule,
    AccordionModule,
    DropdownModule,
    ConfirmDialogModule

  ]
})
export class  SharedModule { }
