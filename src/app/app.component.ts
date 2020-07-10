import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { LoadingController, ToastController,AlertController  } from '@ionic/angular';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
  ];

  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingController: LoadingController,
    private alertController: AlertController, 
    private showToast: ToastController,private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash=false);
    });
  }

  showLogout(msg) {
    let alert = this.alertController.create({
        header: 'Confirm to Log Out',
        message: msg,
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: async () => {
                  console.log("Logout");
                 const loading = await this.loadingController.create({
                   message: 'Logging Out..',
                   duration: 5000
                 });
                 await loading.present();
                 this.navCtrl.navigateRoot('list');
                 loading.dismiss();
                }
            }
        ]
    }).then(alert => alert.present());
  }
  logOut() {
    
    this.showLogout("Are you sure do you really want to log out?");
    
  }
}
