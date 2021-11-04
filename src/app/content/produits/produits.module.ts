import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProduitsRoutingModule } from "./produits-routing.module";
import { ProduitsComponent } from "./produits.component";

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ProduitsRoutingModule
    ],
    declarations: [ProduitsComponent]
})
export class ProduitsModule {}
