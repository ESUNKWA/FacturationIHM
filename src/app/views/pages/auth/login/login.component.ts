import { AuthService } from './../../../../services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  appName: any = 'FacturationAPP';
  logInData: FormGroup;
  spinner: boolean = false;
  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private authServices: AuthService ) {
    this.logInData = this.fb.group({
      p_login: [],
      p_mdp: []
    });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/privilege';
  }

  onLoggedin() {
    //e.preventDefault();

    this.spinner = true;

     this.authServices.fct_login(this.logInData.value).subscribe(
      (res: any = {})=>{
        console.log(res);
        switch (res.status) {
          case -100:
            this.spinner = false;
            alert(res.result);
            break;

          case 0:
            this.spinner = false;
            alert(res.result);
            break;

          case 1:
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('userInfos', JSON.stringify(res.result[0]));



            setTimeout(() => {
              this.spinner = false;
              if (localStorage.getItem('isLoggedin')) {
                this.router.navigate([this.returnUrl]);
              }

            }, 2000);


            break

          default:
            this.router.navigate([this.returnUrl]);
            break;
        }


      },
      (error)=>{
        console.log(error);
      }
    )



  }

}
