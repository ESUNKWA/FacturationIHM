import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { UtilisateurRoutingModule } from "./utilisateur-routing.module";
import { UtilisateurComponent } from "./utilisateur.component";
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';


@NgModule({
    imports: [
      UtilisateurRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      NgxDatatableModule,
      FeahterIconModule,
      HttpClientModule
    ],
    declarations: [UtilisateurComponent]
})
export class UtilisateurModule{}
