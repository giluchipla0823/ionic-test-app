import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { environment } from 'src/environments/environment';

type LoadingStrategy = 'lazy' | 'eager';

@Component({
  selector: 'app-image-shell',
  templateUrl: './image-shell.component.html',
  styleUrls: ['./image-shell.component.scss'],
})
export class ImageShellComponent {
  private debugDisplay =
    environment.appShellConfig && environment.appShellConfig.debug
      ? environment.appShellConfig.debug
      : false;

  @ViewChild('img', { static: false, read: ElementRef }) img!: ElementRef;

  @HostBinding('class.img-loaded') imageLoaded = false;
  @HostBinding('class.img-error') imageError = false;

  @HostBinding('attr.data-error') errorMessage =
    'No se ha podido cargar la imagen';

  @HostBinding('style.backgroundImage') backgroundImage!: string;

  @Output()
  loadedImage: EventEmitter<HTMLImageElement> =
    new EventEmitter<HTMLImageElement>();

  @Input()
  set display(val: string) {
    this._display = val ?? '';

    if (this._display === 'cover') {
      this._loadingStrategy = 'eager';
    }
  }

  @Input()
  set src(val: string) {
    if (!this.debugDisplay) {
      this._src = val ?? '';
    }

    if (this._display === 'cover') {
      this.backgroundImage = 'unset';
    }
  }

  @Input()
  set alt(val: string) {
    this._alt = val ?? '';
  }

  @Input() set className(val: string) {
    this._className = val;
  }

  @Input() set loadingStrategy(val: LoadingStrategy) {
    this._loadingStrategy = val;
  }

  _src = '';
  _alt = '';
  _loadingStrategy: LoadingStrategy = 'lazy';
  _display = '';
  _className = '';

  get display(): string {
    return this._display;
  }

  constructor() {}

  onImageLoaded(): void {
    this.imageLoaded = true;

    if (this._display === 'cover') {
      this.backgroundImage = `url(${this._src})`;
    } else {
      this.loadedImage.emit(this.img.nativeElement);
    }
  }

  onImageLoadError(event: Event): void {
    if (this._src) {
      this.imageLoaded = false;

      setTimeout(() => {
        this.imageError = true;
      }, 500);
    }
  }
}
