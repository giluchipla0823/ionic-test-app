import { SlicePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IMAGES_DATA } from '@data/image-data';
import { ApiResponse } from '@config/types/api-response.type';
import { Image } from '@config/types/image.type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private slicePipe: SlicePipe) {}

  findAllImages(): Observable<Array<Image>> {
    return of(IMAGES_DATA);
  }

  findImageById(id: number): Observable<Image | undefined> {
    return of(IMAGES_DATA.find((item) => item.id));
  }

  paginateImages(
    page: number = 1,
    perPage: number = 15,
    query: string
  ): Observable<ApiResponse<Image>> {
    return of(IMAGES_DATA).pipe(
      map((res) => this.filterData(res, query)),
      map((res) => {
        const totalItems = res.length;
        const totalPages = Math.round(totalItems / perPage);

        const offset = perPage * page;
        const start = offset - perPage;

        const data = this.slicePipe.transform(res, start, offset);

        return {
          page,
          perPage,
          data,
          total_pages: totalPages,
          total: totalItems,
        };
      })
    );
  }

  private filterData(data: Array<Image>, keyword: string): Array<Image> {
    const properties = ['id', 'title', 'text'];
    const countProperties = properties?.length || 0;

    if (countProperties === 0 || !keyword) {
      return data;
    }

    return data.filter((item: any) => {
      let itemFound = false;

      for (let i = 0; i < countProperties; i++) {
        if (new RegExp(keyword, 'gi').test(item[properties[i]])) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });
  }
}
