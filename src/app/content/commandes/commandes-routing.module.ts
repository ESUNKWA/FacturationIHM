import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommandesComponent } from "./commandes.component";
    const routes: Routes = [
        {
            path: '',
            component: CommandesComponent,
            data: {
                title: 'Liste des commandes',
                icon: 'icon-layout-cta-right',
                caption: 'Commandes',
                status: true
            }
        }
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommandesRoutingModule{}