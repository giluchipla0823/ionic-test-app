import { SlicePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedComponentsModule } from '@components/shared/shared-components.module';
import { IonicModule } from '@ionic/angular';
import { DataService } from '@services/data.service';

import { HomePage } from './home.page';
import { CardImageComponent } from './components/card-image/card-image.component';
import { ShellModule } from '@components/shell/shell.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let dataService: DataService;
  let slicePipe: SlicePipe;
  let page: number;
  let perPage: number;

  beforeEach(async () => {
    page = 1;
    perPage = 15;

    await TestBed.configureTestingModule({
      declarations: [HomePage, CardImageComponent],
      imports: [IonicModule.forRoot(), SharedComponentsModule, ShellModule],
      providers: [SlicePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dataService = TestBed.inject(DataService);
    slicePipe = TestBed.inject(SlicePipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('images should be an array', () => {
    expect(component.images.length).toBeDefined();
  });

  it('should load the first 15 image records when the component is started', () => {
    component.ngOnInit();

    dataService.paginateImages(page, perPage, '').subscribe((res) => {
      const cards: NodeList =
        fixture.debugElement.nativeElement.querySelectorAll('app-card-image');

      expect(res).toBeTruthy();
      expect(res.data.length).toBe(perPage);
      expect(cards.length).toBe(perPage);
    });
  });

  it('should find an image record with id 1', () => {
    const id = 1;

    component.ngOnInit();

    dataService.paginateImages(page, perPage, '').subscribe((res) => {
      const founded = res.data.find((value) => value.id === id);

      expect(founded).toBeTruthy();
      expect(founded?.id).toBe(id);
      expect(founded?.title).toBe('Quibusdam laudantium');
    });
  });

  it('should not find an image record with id 5000', () => {
    const id = 5000;

    component.ngOnInit();

    dataService.paginateImages(page, perPage, '').subscribe((res) => {
      const founded = res.data.find((value) => value.id === id);

      expect(founded).toBeUndefined();
    });
  });
});
