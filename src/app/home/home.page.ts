import { Component, OnInit } from '@angular/core';

import { DomSanitizer} from '@angular/platform-browser';

import { NavController } from '@ionic/angular';
import { LoadingController, ToastController,AlertController  } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pdfLink:any;
 

  constructor(private sanitizer: DomSanitizer, private loadingController: LoadingController,
    private alertController: AlertController, 
    private showToast: ToastController,private navCtrl: NavController) {
      
    }

    async ngOnInit() {
      const loading = await this.loadingController.create({
        message: 'Loading..',
      });
     loading.present();
      this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl
      ('http://docs.google.com/gview?embedded=true&url='+'https://assets.biomarking.com/images/sample.pdf');
      loading.dismiss();
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
