import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PartenairesRoutingModule } from './partenaires-routing.module';
import { PartenairesComponent } from "./partenaires.component";

@NgModule({
    imports: [
      CommonModule,
      PartenairesRoutingModule,
      ReactiveFormsModule
    ],
    declarations: [PartenairesComponent]
})
export class PartenairesModule{}
