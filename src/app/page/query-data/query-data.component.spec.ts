import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDataComponent } from './query-data.component';

describe('QueryDataComponent', () => {
  let component: QueryDataComponent;
  let fixture: ComponentFixture<QueryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
