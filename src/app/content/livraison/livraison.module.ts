import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { livraisonRouting } from "./livraison-routing.module";
import { LivraisonComponent } from "./livraison.component";

@NgModule({
    imports: [
        CommonModule,
        livraisonRouting
    ],
    declarations: [LivraisonComponent]
})
export class LivraisonModule{}
