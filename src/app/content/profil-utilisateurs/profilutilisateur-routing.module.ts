import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfilUtilisateursComponent } from "./profil-utilisateurs.component";
    const routes: Routes = [
        {
            path: '',
            component: ProfilUtilisateursComponent,
            data: {
                title: 'Gestion des profils',
                icon: 'icon-layout-cta-right',
                caption: 'Profils utilisateurs',
                status: true
            }
        }
    ]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfilutilisateurRouting{}