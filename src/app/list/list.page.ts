import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  AlertController } from '@ionic/angular';
import { NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  
  showPassword = false;
  passwordToggleIcon = 'eye';
  public email: string;
  public password: string;
  result: any=[]
  msgResult: any=[]
  data: Observable<any>

  constructor(private http: HttpClient, private alertController: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController){}

  ngOnInit() {
  }
  
  togglePassword():void{
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon ='eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
   }
   async logIn(){
    if(this.email==null && this.password ==null){
      this.presentAlert("Please Input Username and Password")
    }else if(this.email == null || this.email==""){
      this.presentAlert("Please Input Username")
    }
    else if(this.password == null || this.password==""){
      this.presentAlert("Please Input Password")
    }else{
      const loading =  await this.loadingController.create({
        message: 'Logging In..',
      });
      loading.present();
      var url ='https://my-json-server.typicode.com/litkelfabio/demo/user';
      var msgUrl ='https://my-json-server.typicode.com/litkelfabio/demo/Message';
      this.data = this.http.get(url);
      this.data.subscribe(data =>{
        this.result = data
        if(this.email == this.result.username && this.password == this.result.password){
          this.data = this.http.get(msgUrl);
          this.data.subscribe(data =>{
            this.msgResult = data[1]
            this.presentAlert(this.msgResult.data.token)
            this.navCtrl.navigateRoot('/home')
            loading.dismiss();
          })
        }else{
          this.data = this.http.get(msgUrl);
          this.data.subscribe(data =>{
            this.msgResult = data[0]
            this.presentAlert(this.msgResult.data.message)
            loading.dismiss();
            console.log(this.msgResult.data.message)
          })
        }
      })
    }
   }

   presentAlert(msg) {
    this.alertController.create({
      header:'Alert',
      message:msg,
      buttons: ['OK']
    }).then(alert => alert.present());
   }
}
