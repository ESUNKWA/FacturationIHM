import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonprofilComponent } from "./monprofil.component";

const routes: Routes = [
    {
        path: '',
        component: MonprofilComponent,
        data: {
            title: 'Mon profil',
            icon: 'icon-layout-cta-right',
            caption: 'Mon profil',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonProfilRoutingModule{}