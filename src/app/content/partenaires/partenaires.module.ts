import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { PartenairesRoutingModule } from './partenaires-routing.module';
import { PartenairesComponent } from "./partenaires.component";

@NgModule({
    imports: [
      CommonModule,
      PartenairesRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgbDropdownModule
    ],
    declarations: [PartenairesComponent]
})
export class PartenairesModule{}
