import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserInfosService } from 'src/app/services/userInfos/user-infos.service';
import { ProduitService } from 'src/app/services/produit/produit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userInfos: any = {};
  data: any = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router, private userInfoServices: UserInfosService,
    private alertStockProduit: ProduitService
  ) { }

  ngOnInit(): void {

    this.userInfos = this.userInfoServices.fs_informationUtilisateur();

    setInterval(()=>{
      this.alertStockProduit.alertStock(this.userInfos.r_partenaire).subscribe(
        ( res: any = {} )=>{
          this.data = res.result;        
        }
      )
    }, 5000);

   
  }

  stockProduit(){
    
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
