import { CommonModule, DecimalPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CategorieRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";

@NgModule({
    imports: [
        CommonModule,
        CategorieRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbTypeaheadModule,
        NgbPaginationModule

    ],
    declarations: [CategoriesComponent],
    providers: [DecimalPipe],
})
export class CategoriesModule{}
