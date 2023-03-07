import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ShellModule } from '@components/shell/shell.module';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { CardImageComponent } from './components/card-image/card-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedComponentsModule,
    ShellModule,
  ],
  declarations: [HomePage, CardImageComponent],
})
export class HomePageModule {}
