import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProduitsComponent } from "./produits.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
    {
        path:'liste',
        component: ProduitsComponent,
        data: {
            title: 'Gestion des produits',
            icon: 'icon-layout-cta-right',
            caption: 'Produits',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProduitsRoutingModule{}