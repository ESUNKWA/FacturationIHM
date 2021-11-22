import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";

@NgModule({
    imports: [
        CommonModule,
        ClientsRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ClientsComponent]
})
export class ClientsModule{}
