import { TestBed } from '@angular/core/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ImageProcessingService } from './image-processing.service';

describe('ImageProcessingService', () => {
  let service: ImageProcessingService;
  let toatre:ToastrService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot()
      ],
      providers: [
        ToastrService,
        ImageProcessingService
      ]
    });
    service = TestBed.inject(ImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
