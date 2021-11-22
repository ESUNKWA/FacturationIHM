import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LivraisonComponent } from "./livraison.component";

const routes: Routes = [
    {
        path: '',
        component: LivraisonComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class livraisonRouting{}
