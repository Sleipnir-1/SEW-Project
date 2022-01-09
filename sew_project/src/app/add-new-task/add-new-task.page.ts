import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {

  constructor(public modalCtrl: ModalController, public itemService: ItemService) { }

  itemName
  itemDate

  item: Item

  ngOnInit() {
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }

  AddItem(){
    if (this.itemName != null) {
      this.item = ({ name: this.itemName, date: Date.now().toString(), done: false })
      this.itemService.create(this.item)
      this.dismiss()
    } else { alert("Please enter a Item") }
  }

  /*
  AddItem() {
    if (this.itemName != null) {
      console.log(this.itemName)
      this.item = ({ name: this.itemName, date: Date.now(), done: false })
      this.itemService.createItem(this.item)
      this.dismiss()
    } else { alert("Please enter a Item") }

  }
  */
}
