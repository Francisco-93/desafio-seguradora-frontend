import { error } from 'selenium-webdriver';
import { ApoliceServicoService } from './../apolices/apolice-servico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-apolice',
  templateUrl: './area-apolice.component.html',
  styleUrls: ['./area-apolice.component.css']
})
export class AreaApoliceComponent implements OnInit {

  private urlObserver: Subscription;
  private apoliceVencida: boolean;
  private numeroApoliceAtivo: any;
  private validadorForm: boolean = false;

  formularioApolice: FormGroup;

  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private apoliceService: ApoliceServicoService,
    private formBuilder: FormBuilder
  ) {
    this.formularioApolice = this.formBuilder.group({
      numeroDaApolice: [null],
      inicioVigencia: [null, Validators.required],
      fimVigencia: [null, Validators.required],
      placaVeiculo: [null, Validators.required],
      valorApolice: [null, Validators.required],
      apoliceVencida: [null, Validators.required],
      diasParaVencerOuVencidos: [null, Validators.required],
      cliente: this.formBuilder.group({
        id: [null],
        nome: [null, Validators.required],
        cpf: [null, Validators.required]
      })
    })
  }

  ngOnInit() {
    this.obterIdRota()
    this.obterApolice(this.numeroApoliceAtivo);
  }

  voltarListagemApolices() {
    this.router.navigate(['/apolices']);
  }

  obterIdRota() {
    this.urlObserver = this.routeActive.params.subscribe(url => {
      this.numeroApoliceAtivo = url['numeroDaApolice'];
    })
  }

  onSubmit() {
    this.formularioApolice.patchValue({
      apoliceVencida: this.formularioApolice.get('apoliceVencida').value === 'Sim' ? true : false
    })
    let jsonCliente = JSON.stringify(this.formularioApolice.value);

    if (!this.validarForm()) {
      this.apoliceService.inserirApolice(jsonCliente).subscribe(response => {
        alert('Apólice cadastrada com sucesso!');
        this.router.navigate(['apolices']);
      },
        error => {
          alert(error.error.causa);
        });
    } else {
      alert('Todos os campos devem ser preenchidos.');
      console.log(!this.validarForm);
    }
  }

  obterApolice(numeroDaApolice) {
    this.apoliceService.buscarApolicePorNumero(numeroDaApolice).subscribe(response => {
      this.formularioApolice.patchValue({
        numeroDaApolice: response.numeroDaApolice,
        inicioVigencia: response.inicioVigencia,
        fimVigencia: response.fimVigencia,
        placaVeiculo: response.placaVeiculo,
        valorApolice: response.valorApolice,
        apoliceVencida: response.apoliceVencida == true ? 'Sim' : 'Não',
        diasParaVencerOuVencidos: response.diasParaVencerOuVencidos
      })
      this.formularioApolice.get('cliente').patchValue({
        id: response.cliente.id,
        nome: response.cliente.nome,
        cpf: response.cliente.cpf
      })
      this.apoliceVencida = response.apoliceVencida;
    })
  }

  excluirApolice() {
    this.apoliceService.excluirApolice(this.numeroApoliceAtivo).subscribe(response => {
      alert('Apólice excluída com sucesso!');
      this.router.navigate(['apolices']);
    }, error => {
      alert('Não foi possível excluir essa apólice.')
    })
  }

  validarForm() {
    console.log(this.formularioApolice.controls)
    const status = 'INVALID';
    if (
      this.validadorForm ||
      this.formularioApolice.controls.cliente.get('cpf').status == status ||
      this.formularioApolice.controls.cliente.get('nome').status == status ||
      this.formularioApolice.controls.inicioVigencia.status == status ||
      this.formularioApolice.controls.fimVigencia.status == status ||
      this.formularioApolice.controls.placaVeiculo.status == status ||
      this.formularioApolice.controls.valorApolice.status == status
    ) {
      return true;
    } else {
      return false;
    }

  }

}
