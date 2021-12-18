import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewsachatprodComponent } from "./viewsachatprod.component";

const routes: Routes = [
    {
        path: '',
        component: ViewsachatprodComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewsAchatsProdRouting{}
