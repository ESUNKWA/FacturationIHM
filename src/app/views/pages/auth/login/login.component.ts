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

  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private authServices: AuthService ) {
    this.logInData = this.fb.group({
      p_login: [],
      p_mdp: []
    });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin() {
    //e.preventDefault();


     this.authServices.fct_login(this.logInData.value).subscribe(
      (res: any = {})=>{
        console.log(res);
        switch (res.status) {
          case -100:
            alert(res.result);
            break;

          case 0:
            alert(res.result);
            break;

          case 1:
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('userInfos', JSON.stringify(res.result[0]));
                        
            if (localStorage.getItem('isLoggedin')) {
              this.router.navigate([this.returnUrl]);
            }
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

    /* console.log(this.logInData.value);
     */

  }

}
