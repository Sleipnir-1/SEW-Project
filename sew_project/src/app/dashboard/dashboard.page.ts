

import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { AuthenticationService } from "../shared/authentication-service";

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemService } from '../shared/item.service';

import { AngularFireList,AngularFireDatabase } from '@angular/fire/compat/database';
import { Item } from '../shared/item';


interface ItemID {
  id : string;
  name: string;
  date: string;
  done: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

//Zeigt nicht erledigte/gekaufte Items an
export class DashboardPage implements OnInit  {
  items : ItemID[]; // Item Array

  userId : string = null //UserID die für DB-Abfragen benötigt wird
  constructor(private menu: MenuController, public authService: AuthenticationService, public modalCtrl : ModalController, public itemsService : ItemService,private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
    //this.afAuth.authState.subscribe(user => {
   //   if(user) this.userId = user.uid
  //})
  this.userId = JSON.parse(localStorage.getItem('user')).uid
  }

  

  
  //Bei Laden der View nicht erledigte Items aufrufen und in Array schreiben
  ionViewDidEnter(){
    console.log(this.userId)
    this.itemsService.getUndoneItems().subscribe((res) => {
      this.items = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as ItemID
        }));
    });
  }

  ngOnInit() {
    
  }

  //Item Abschließen
  completeItem(item: ItemID) {
    this.itemsService.update(item.id, {
      name: item.name,
      date: item.date,
      done: item.done
    });
  }

  //Aufrufe für Sidemenu
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  //Öffnen des Modals für neues Item
  async addTask(){
    const modal = await this.modalCtrl.create({
      component : AddNewTaskPage
    })
    return await modal.present()
  }

  //Löschen von Item über id
  deleteItem(id : string){
    this.itemsService.delete(id);
  }

}
