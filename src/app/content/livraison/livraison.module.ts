import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivraisonComponent } from './livraison.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { livraisonRouting } from "./livraison-routing.module";

@NgModule({
    imports: [
        CommonModule,
        livraisonRouting,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgbDropdownModule
    ],
    declarations: [LivraisonComponent]
})
export class LivraisonModule{}
