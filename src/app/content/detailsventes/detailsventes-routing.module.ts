import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

    const routes: Routes = [
        {
            path: "",

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
