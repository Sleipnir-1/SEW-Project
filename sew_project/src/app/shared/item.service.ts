import { Injectable } from '@angular/core';
import { Item } from './Item';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class ItemService {
  //items: AngularFireList<any>;
  userId: string = null


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private ngFirestore : AngularFirestore, private router: Router) { 
      //this.afAuth.authState.subscribe(user => {
      //    if(user) this.userId = user.uid
      //})
      this.userId = JSON.parse(localStorage.getItem('user')).uid
  }

  

  create(item: Item) {
    return this.ngFirestore.collection(this.userId).add(item);
  }

  getItems() {
    return this.ngFirestore.collection(this.userId).snapshotChanges();
  }

  getDoneItems() {
    console.log(this.userId)
    return this.ngFirestore.collection(this.userId, ref => ref.where('done', '==', true)).snapshotChanges();
  }

  getUndoneItems() {
    return this.ngFirestore.collection(this.userId, ref => ref.where('done', '==', false)).snapshotChanges();
  }

  
  
  getTask(id) {
    return this.ngFirestore.collection(this.userId).doc(id).valueChanges();
  }

  update(id, item: Item) {
    if (item.done == true) {
      item.done = false
    } else {
      item.done = true
    }
    this.ngFirestore.collection(this.userId).doc(id).update(item)
      .then(() => {
        //this.router.navigate(['dashboard']);
      }).catch(error => console.log(error));;
  }

  delete(id: string) {
    this.ngFirestore.collection(this.userId).doc(id).delete();
  }

  // Old Functions
  /* 
  //Todo Daten laden
  getItemList() : AngularFireList<any>{
      if(!this.userId) return;
      return this.db.list('items/'+this.userId);
  }


  // Create
  createItem(item: Item) {
    this.db.list('items/'+this.userId).push({
      name : item.name,
      date : item.date,
      done : item.done
    })
  }
  */
}