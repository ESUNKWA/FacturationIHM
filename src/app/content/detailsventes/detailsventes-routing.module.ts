import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsventesComponent } from "./detailsventes.component";

    const routes: Routes = [
        {
            path: "",
            component: DetailsventesComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsVenteRoutingModule{}
