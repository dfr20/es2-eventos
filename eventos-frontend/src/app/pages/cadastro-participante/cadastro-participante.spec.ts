import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroParticipanteComponent } from './cadastro-participante';

describe('CadastroParticipante', () => {
  let component: CadastroParticipanteComponent;
  let fixture: ComponentFixture<CadastroParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroParticipanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
