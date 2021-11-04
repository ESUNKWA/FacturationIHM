import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsventesComponent } from "./detailsventes.component";

    const routes: Routes = [
        {
            path: "",
            component: DetailsventesComponent,
            data: {
                title: 'Détails des ventes',
                icon: 'icon-layout-cta-right',
                caption: 'Détails des ventes',
                status: true
            }
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsVenteRoutingModule{}