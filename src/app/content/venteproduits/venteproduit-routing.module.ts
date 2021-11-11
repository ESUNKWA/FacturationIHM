import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VenteproduitsComponent } from "./venteproduits.component";

const routes: Routes = [
    {
        path: '',
        component: VenteproduitsComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VenteproduitsRouting{}
