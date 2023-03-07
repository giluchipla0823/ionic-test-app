import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { finalize, Subject, takeUntil } from 'rxjs';

import { DataService } from '@services/data.service';
import { Image } from '@config/types/image.type';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll!: IonInfiniteScroll;

  images: Array<Image> = [];
  totalImages = 0;

  private searchQuery = '';
  private page = 1;
  private perPage = 15;
  private pageDestroyed$: Subject<boolean> = new Subject<boolean>();

  get counterDisplayedImages(): number {
    return this.images.length;
  }

  get emptyResultsData(): any {
    return {
      icon: 'search-outline',
      message: `No hay resultados para "${this.searchQuery}"`,
      additionalMessage:
        'Comprueba la ortografía o prueba con una nueva búsqueda',
    };
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  ngOnDestroy(): void {
    this.pageDestroyed$.next(true);
    this.pageDestroyed$.complete();
  }

  handleRefresh($event: any) {
    setTimeout(() => {
      this.page = 1;
      this.images = [];

      this.fetchImages();

      $event.target.complete();
    }, 2000);
  }

  onSearchChange($event: any) {
    this.searchQuery = $event.detail.value;
    this.page = 1;
    this.images = [];
    this.fetchImages();
  }

  loadMore(): void {
    if (this.images.length === this.totalImages) {
      return;
    }

    this.page++;

    this.fetchImages();
  }

  trackByItems(index: number, item: Image) {
    return item.id;
  }

  private fetchImages(): void {
    this.infiniteScroll.disabled = false;

    this.dataService
      .paginateImages(this.page, this.perPage, this.searchQuery)
      .pipe(
        takeUntil(this.pageDestroyed$),
        finalize(() => {
          this.infiniteScroll.complete();

          this.infiniteScroll.disabled =
            this.images.length === this.totalImages;
        })
      )
      .subscribe(({ data, total }) => {
        this.images = [...this.images, ...data];
        this.totalImages = total;
      });
  }
}
