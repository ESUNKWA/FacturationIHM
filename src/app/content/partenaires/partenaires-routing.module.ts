import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PartenairesComponent } from "./partenaires.component";
    const routes: Routes = [
        {
            path: '',
            component: PartenairesComponent
        }
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartenairesRoutingModule{}