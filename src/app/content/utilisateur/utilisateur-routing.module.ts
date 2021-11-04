import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UtilisateurComponent } from "./utilisateur.component";

    const routes: Routes = [
        {
            path: '',
            component: UtilisateurComponent,
            data: {
                title: 'Gestion des utilisateurs',
                icon: 'icon-layout-cta-right',
                caption: 'utilisateurs',
                status: true
            }
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UtilisateurRoutingModule{}