import { ModalService } from 'src/app/services/modal/modal.service';
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

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private authServices: AuthService, private notif: ModalService ) {
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

    if( this.logInData.value.p_login == '' || this.logInData.value.p_login == undefined ){
      this.notif.fs_modal('Veuillez saisir votre login', 'warning');
      return;
    }

    if( this.logInData.value.p_mdp == '' || this.logInData.value.p_mdp == undefined ){
      this.notif.fs_modal('Veuillez saisir votre mot de passe', 'warning');
      return;
    }

    this.spinner = true;

     this.authServices.fct_login(this.logInData.value).subscribe(
      (res: any = {})=>{

        switch (res.status) {
          case -100:
            this.spinner = false;

            this.notif.fs_modal(res.result, 'warning');

            break;

          case 0:
            this.spinner = false;
            this.notif.fs_modal(res.result, 'warning');
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
