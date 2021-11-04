import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';

@Component({
  selector: 'app-monprofil',
  templateUrl: './monprofil.component.html',
  styleUrls: ['./monprofil.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class MonprofilComponent implements OnInit {
  userInfos: any = {};
  constructor( private infosUtilisateur: UserInfosService ) { }

  ngOnInit() {
    this.userInfos = this.infosUtilisateur.fs_informationUtilisateur();
  }

}
