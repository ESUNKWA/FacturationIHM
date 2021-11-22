import { LivraisonService } from './../../services/livraison/livraison.service';
import { Component, OnInit } from '@angular/core';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})
export class LivraisonComponent implements OnInit {
  userInfos: any = {};
  chargementEncours: boolean;
  data: any[];


  constructor( private livraisonServices: LivraisonService, private infosUtilisateur: UserInfosService, private modalService: NgbModal, ) { }

  ngOnInit(): void {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur()

    this.listLivraison();
  }

  listLivraison(){

    this.chargementEncours = true;

    this.livraisonServices.listLivraisons(this.userInfos.r_partenaire).subscribe(
      (res: any ={})=>{
        this.data = res.result;
        console.log(this.data);

        setTimeout(()=>{
          this.chargementEncours = false;
        },500);
      },
      (error)=>{
        console.log(error);

      }
    )
  }

  openVerticalCenteredModal(content) {
    this.modalService.open(content, {centered: true, size:'lg'}).result.then((result) => {

    }).catch((res) => {});
  }

}
