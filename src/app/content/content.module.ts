import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ContentRoutingModule } from "./content-routing.module";
import { LivraisonComponent } from './livraison/livraison.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
    imports: [
        CommonModule,
        ContentRoutingModule
    ],
    declarations: []
})

export class ContentModule{}
