import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProduitsComponent } from "./produits.component";


const routes: Routes = [

    {
        path:'',
        component: ProduitsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProduitsRoutingModule{}
