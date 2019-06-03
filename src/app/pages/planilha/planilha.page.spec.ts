import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanilhaPage } from './planilha.page';

describe('PlanilhaPage', () => {
  let component: PlanilhaPage;
  let fixture: ComponentFixture<PlanilhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanilhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanilhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
