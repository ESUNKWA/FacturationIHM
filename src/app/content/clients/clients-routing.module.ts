import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientsComponent } from "./clients.component";

const routes: Routes = [
    {
        path: '',
        component: ClientsComponent,
        data: {
            title: 'Liste des clients',
            icon: 'icon-layout-cta-right',
            caption: 'Liste des clients',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule{}