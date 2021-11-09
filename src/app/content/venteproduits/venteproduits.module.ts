import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, NgSelectOption, ReactiveFormsModule } from "@angular/forms";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { ArchwizardModule } from "angular-archwizard";
import { VenteproduitsRouting } from "./venteproduit-routing.module";
import { VenteproduitsComponent } from "./venteproduits.component";

@NgModule({
    imports: [
        CommonModule,
        VenteproduitsRouting,
        FormsModule,
        ReactiveFormsModule,
        ArchwizardModule,
        NgbNavModule
    ],
    declarations: [VenteproduitsComponent]
})
export class VenteproduitModule{}
