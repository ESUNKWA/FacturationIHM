import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategorieRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";

@NgModule({
    imports: [
        CommonModule,
        CategorieRoutingModule,
        ReactiveFormsModule

    ],
    declarations: [CategoriesComponent]
})
export class CategoriesModule{}
