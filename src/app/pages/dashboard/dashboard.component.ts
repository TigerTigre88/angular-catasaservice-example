import { Component, HostListener } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { ImageComponent } from 'src/app/components/image/image.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, ImageComponent],
})
export class DashboardComponent {
  private _offset: number = 0;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const pos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this._offset += 30;
      this._getCats(this._offset);
    }
  }
  catList: Array<any> = [];
  constructor(private api: ApiService) {
    this._getCats();
  }

  private _getCats(offset: number = 0): void {
    this.api.getCats(offset).subscribe((x) => {
      if (x) {
        this.catList = [...this.catList, ...x];
      }
    });
  }
}
