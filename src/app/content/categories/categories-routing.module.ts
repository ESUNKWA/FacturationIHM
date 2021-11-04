import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./categories.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
    },
     {
        path:'liste',
        component: CategoriesComponent,
        data: {
            title: 'Gestion des catégories',
            icon: 'icon-layout-cta-right',
            caption: 'Catégories de produits',
            status: true
        }
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CategorieRoutingModule{}