import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { ProduitsRoutingModule } from "./produits-routing.module";
import { ProduitsComponent } from "./produits.component";

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ProduitsRoutingModule,
      FormsModule,
      NgxMaskModule.forRoot({ validation: true})
    ],
    declarations: [ProduitsComponent]
})
export class ProduitsModule {}
