import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ItemService } from '../shared/item.service';

interface ItemID {
  id : string;
  name: string;
  date: string;
  done: boolean;
}

@Component({
  selector: 'app-done-items',
  templateUrl: './done-items.page.html',
  styleUrls: ['./done-items.page.scss'],
})

//Zeigt bereits erledigte/gekaufte Items an
//Kommentare: siehe dashboard Page, dar fast identisch
export class DoneItemsPage implements OnInit {
  items : ItemID[];

  userId : string = null

  constructor(private menu: MenuController, public itemsService : ItemService) {
    this.userId = JSON.parse(localStorage.getItem('user')).uid
   }

  ionViewDidEnter(){
    console.log(this.userId)
    this.itemsService.getDoneItems().subscribe((res) => {
      this.items = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as ItemID
        }));
    }); 
  }

  ngOnInit() {
    
  }

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

  recoverItem(item: ItemID) {
    this.itemsService.update(item.id, {
      name: item.name,
      date: item.date,
      done: item.done
    });
  }

  deleteItem(id : string){
    this.itemsService.delete(id);
  }

}
