import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PartenairesComponent } from "./partenaires.component";
    const routes: Routes = [
        {
            path: '',
            component: PartenairesComponent,
            data: {
                title: 'Liste des partenaires',
                icon: 'icon-layout-cta-right',
                caption: 'Partenaires',
                status: true
            }
        }
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartenairesRoutingModule{}