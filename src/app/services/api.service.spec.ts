import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { CatPicture } from '../types/cat';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const baseUrl = 'https://cataas.com/';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(ApiService);
  });

  it('should fetch cats with details', () => {
    const mockCats: Partial<CatPicture>[] = [
      { id: '1' },
      { id: '2' },
    ];

    const mockCatDetails: CatPicture[] = [
      { id: '1', url: 'cat1.jpg' } as CatPicture,
      { id: '2', url: 'cat2.jpg' } as CatPicture,
    ];

    httpClientSpy.get.withArgs(`${baseUrl}api/cats`, { params: { limit: 30, skip: 0 } }).and.returnValue(of(mockCats));
    mockCats.forEach((cat, index) => {
      httpClientSpy.get.withArgs(`${baseUrl}cat/${cat.id}`).and.returnValue(of(mockCatDetails[index]));
    });

    service.getCats().subscribe((cats) => {
      expect(cats.length).toBe(2);
      expect(cats).toEqual(mockCatDetails);
    });
  });
});
