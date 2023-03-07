import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { SlicePipe } from '@angular/common';

describe('DataService', () => {
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService, SlicePipe],
    });

    dataService = TestBed.inject(DataService);
  });

  it('should retrieve all images', () => {
    dataService.findAllImages().subscribe((images) => {
      expect(images).withContext('No images returned').toBeTruthy();
      expect(images.length)
        .withContext('Incorrect number of images')
        .toBe(4000);
    });
  });

  it('should find an image by id', () => {
    const id = 1;

    dataService.findImageById(id).subscribe((image) => {
      expect(image).toBeTruthy();
      expect(image?.id).toBe(1);
      expect(image?.title).toBe('Quibusdam laudantium');
    });
  });

  it('should retrieve images by page', () => {
    const page = 1;
    const perPage = 15;

    dataService.paginateImages(page, perPage, '').subscribe((res) => {
      expect(res).withContext('No images returned').toBeTruthy();
      expect(res.page).toBe(page);
      expect(res.perPage).toBe(perPage);
      expect(res.data.length).toBe(perPage);
      expect(res.total).toBe(4000);
    });
  });

  it('should retrieve six images when query filter by title is "odit quia"', () => {
    const page = 1;
    const perPage = 15;
    const query = 'odit quia';

    dataService.paginateImages(page, perPage, query).subscribe((res) => {
      expect(res).withContext('No images returned').toBeTruthy();
      expect(res.data.length).toBe(6);
    });
  });

  it('should retrieve one image when query filter by id is "1000"', () => {
    const page = 1;
    const perPage = 15;
    const query = '1000';

    dataService.paginateImages(page, perPage, query).subscribe((res) => {
      expect(res).withContext('No images returned').toBeTruthy();
      expect(res.data.length).toBe(1);
    });
  });

  it('should retrieve the same number of images according to the specified limit', () => {
    const page = 1;
    const perPage = 60;

    dataService.paginateImages(page, perPage, '').subscribe((res) => {
      expect(res).withContext('No images returned').toBeTruthy();
      expect(res.data.length).toEqual(perPage);
    });
  });
});
