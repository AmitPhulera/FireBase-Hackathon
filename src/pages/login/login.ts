import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  goToHomePage(){
    this.navCtrl.push(MainPage);
  }
  // Attempt to login in through our User service
  doLogin() {
    /*this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result)=>{
      let user=result.user;
      console.log(user);
      console.log(this);
      let toast = this.toastCtrl.create({
        message: "Hello "+user.providerData[0].displayName,
        duration: 3000,
        position: 'top'
      });

      toast.present();
      this.navCtrl.push(MainPage);
    });
  }
}
