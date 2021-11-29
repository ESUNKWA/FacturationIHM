import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";

@NgModule({
    imports: [
        CommonModule,
        ClientsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbDatepickerModule
    ],
    declarations: [ClientsComponent]
})
export class ClientsModule{}
