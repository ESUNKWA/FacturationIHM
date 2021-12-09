import { NgxMaskModule } from 'ngx-mask';
import { LoaderComponent } from './../loader/loader.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommandesRoutingModule } from "./commandes-routing.module";
import { CommandesComponent } from "./commandes.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbNavModule,
      ArchwizardModule,
      CommandesRoutingModule,
      NgxMaskModule.forRoot({validation: true}),
      NgbDatepickerModule
    ],
    declarations: [CommandesComponent, LoaderComponent]
})
export class CommandesModule{}
