
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { ArchwizardModule } from "angular-archwizard";
import { TagInputModule } from "ngx-chips";
import { NgxMaskModule } from "ngx-mask";
import { ViewsAchatsProdRouting } from "./viewsachatprod-routing.module";
import { ViewsachatprodComponent } from "./viewsachatprod.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ArchwizardModule,
        NgbNavModule,
        NgxMaskModule.forRoot({ validation: true}),
        TagInputModule,
        NgbDatepickerModule,
        ViewsAchatsProdRouting
    ],
    declarations: [ViewsachatprodComponent]
})
export class ViewsAchatsProdModule{}

