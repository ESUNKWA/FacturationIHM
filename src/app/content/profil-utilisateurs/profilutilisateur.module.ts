import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfilUtilisateursComponent } from "./profil-utilisateurs.component";
import { ProfilutilisateurRouting } from "./profilutilisateur-routing.module";

@NgModule({
    imports: [
      ProfilutilisateurRouting,
      CommonModule,
      ReactiveFormsModule,
      NgbNavModule

    ],
    declarations: [ProfilUtilisateursComponent]
})
export class ProfilUtilisateursModule{}
