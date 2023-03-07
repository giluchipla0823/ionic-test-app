import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss'],
})
export class ShowHidePasswordComponent implements OnInit {
  @ContentChild(IonInput, { static: false }) input!: IonInput;

  show = false;

  constructor() {}

  ngOnInit() {}

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.input.type = 'text';
    } else {
      this.input.type = 'password';
    }
  }
}
