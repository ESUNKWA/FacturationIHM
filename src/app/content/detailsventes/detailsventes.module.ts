import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { DetailsVenteRoutingModule } from "./detailsventes-routing.module";
import { DetailsventesComponent } from "./detailsventes.component";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };

@NgModule({
    imports: [
        CommonModule,
        DetailsVenteRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule,
        NgbDropdownModule,
        PerfectScrollbarModule
    ],
    providers: [
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
    ],
    declarations: [DetailsventesComponent]
})
export class DetailsventesModule{}
