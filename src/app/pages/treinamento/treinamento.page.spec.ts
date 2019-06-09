import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinamentoPage } from './treinamento.page';

describe('TreinamentoPage', () => {
  let component: TreinamentoPage;
  let fixture: ComponentFixture<TreinamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreinamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
