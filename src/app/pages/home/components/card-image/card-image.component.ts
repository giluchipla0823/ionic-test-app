import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@config/types/image.type';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent implements OnInit {
  @Input() item!: Image;

  constructor() {}

  ngOnInit() {}
}
