import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyResultsComponent } from './empty-results/empty-results.component';
import { IonicModule } from '@ionic/angular';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    EmptyResultsComponent,
    ShowHidePasswordComponent,
    ErrorMessagesComponent,
  ],
  exports: [
    EmptyResultsComponent,
    ShowHidePasswordComponent,
    ErrorMessagesComponent,
  ],
})
export class SharedComponentsModule {}
