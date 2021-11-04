import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MonProfilRoutingModule } from "./monprofil-routing.module";
import { MonprofilComponent } from "./monprofil.component";

@NgModule({
    imports: [
        CommonModule,
        MonProfilRoutingModule
    ],
    declarations: [MonprofilComponent]
})
export class MonProfilModule{}
