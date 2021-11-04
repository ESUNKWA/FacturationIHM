import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VenteproduitsComponent } from "./venteproduits.component";

const routes: Routes = [
    {
        path: '',
        component: VenteproduitsComponent,
        data: {
            title: 'Liste des ventes',
            icon: 'icon-layout-cta-right',
            caption: 'Liste des ventes',
            status: true
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VenteproduitsRouting{}