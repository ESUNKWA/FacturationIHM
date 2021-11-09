import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path:'produits_categories',
        data: {
            title: 'Stock',
            status: false
        },
        loadChildren: './categories/categories.module#CategoriesModule'
    },
    {
        path:'stock_produits',
        data: {
            title: 'Stock',
            status: false
        },
        loadChildren: './produits/produits.module#ProduitsModule'
    },
    {
        path:'liste_ventes',
        data: {
            title: 'Gestion',
            status: false
        },
        loadChildren: './venteproduits/venteproduits.module#VenteproduitModule'
    },{
        path:'commmandes',
        data: {
            title: 'Commandes',
            status: false
        },
        loadChildren: './commandes/commandes.module#CommandesModule'
    },
    {
        path: 'liste_clients',
        data: {
            title: 'Gestion',
            status: false
        },
        loadChildren: './clients/clients.module#ClientsModule'
    },
    {
        path: 'mesinfos',
        data: {
            title: 'Mes informations',
            status: false
        },
        loadChildren: './monprofil/monprofil.module#MonProfilModule'
    },
    {
        path: 'list_utilisateur',
        data: {
            title: 'Utilisateurs',
            status: false
        },
        loadChildren: './utilisateur/utilisateur.module#UtilisateurModule'
    },
    {
        path: 'profilutilisateur',
        data: {
            title: 'Profils utilisateurs',
            status: false
        },
        loadChildren: './profil-utilisateurs/profilutilisateur.module#ProfilUtilisateursModule'
    },
    {
        path: 'partenaires',
        data: {
            title: 'Profils utilisateurs',
            status: false
        },
        loadChildren: './partenaires/partenaires.module#PartenairesModule'
    },
    {
        path: 'ventes',
        data: {
            title: 'Détails ventes',
            status: false
        },
        loadChildren: './detailsventes/detailsventes.module#DetailsventesModule'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentRoutingModule{}
