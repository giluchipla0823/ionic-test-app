import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageShellComponent } from './image-shell/image-shell.component';

@NgModule({
  declarations: [ImageShellComponent],
  imports: [CommonModule, IonicModule],
  exports: [ImageShellComponent],
})
export class ShellModule {}
