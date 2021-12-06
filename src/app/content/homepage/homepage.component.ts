import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  images = ['assets/home/4.jpg', 'assets/home/2.jpg', 'assets/home/5.jpg'];

  constructor( private router: Router ) {
   }

  ngOnInit(): void {
     
  }



  linklogin(){
    const link = ['/auth/login']
    this.router.navigate(link);
  }

}
