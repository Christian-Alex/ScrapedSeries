import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    })
  );

  it('should load data by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.chargeData).toBeTruthy();
  });

  it('should load data search from enviroment series', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.searchSeries().finally(() => {
      fixture.detectChanges();
      expect(app.SeriesCollection).toBeTruthy();
    });
  });
  // const compiled = fixture.nativeElement as HTMLElement;
  // expect(compiled.querySelector('.content span')?.textContent).toContain('scraping-series app is running!');
});
