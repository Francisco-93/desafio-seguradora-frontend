import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { ApoliceServicoService } from './apolice-servico.service';
import { Apolice } from '../model/apolice-model';

@Component({
  selector: 'app-apolices',
  templateUrl: './apolices.component.html',
  styleUrls: ['./apolices.component.css'],
  providers: [ApoliceServicoService]
})
export class ApolicesComponent implements OnInit {
  private apolicesPaginadas: any;
  private paginaAtual: number;
  private ultimaPagina: number;
  private apolices: Apolice[] = [];
  private validadorForm: boolean = false;

  formularioApolice: FormGroup;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private apoliceServico: ApoliceServicoService,
    private formBuilder: FormBuilder,
    private router: Router) {

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
    this.listarApolicePaginado(0);
  }

  listarApolicePaginado(pagina: number) {
    this.apoliceServico.listarApolicesComPaginacao(pagina).subscribe(response => {
      this.apolicesPaginadas = response;
      console.log(this.apolicesPaginadas);
      this.paginaAtual = pagina + 1;
      this.ultimaPagina = this.apolicesPaginadas.totalPages;
      this.apolices = this.apolicesPaginadas.content;
      console.log(this.apolices);
    })
  }

  onSubmit() {
    console.log(this.formularioApolice.controls);
    console.log(JSON.stringify(this.formularioApolice.value));
    let jsonCliente = JSON.stringify(this.formularioApolice.value);

    if (!this.validarForm()) {
      this.apoliceServico.inserirApolice(jsonCliente).subscribe(response => {
        alert('Apólice cadastrada com sucesso!');
        location.reload();
      },
        error => {
          alert(error.error.causa);
        });
    } else {
      alert('Todos os campos devem ser preenchidos.');
      console.log(!this.validarForm);
    }
  }

  limparFormulario() {
    this.formularioApolice.reset();
  }


  buscarCPF(cpf: string) {
    this.blockUI.start('Carregando...');
    cpf = this.formatarCpf(cpf);
    this.apoliceServico.buscarClientePorCpf(cpf).subscribe(response => {
      this.formularioApolice.get('cliente').patchValue({
        id: response.id,
        cpf: response.cpf,
        nome: response.nome
      })
    }, error => {
      if (error.error.causa === undefined) {
        alert('Cliente não encontrado na base.');
      } else {
        alert(error.error.causa);
      }
      this.validadorForm = true;
    })
    this.blockUI.stop();
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

  formatarCpf(cpf: string) {
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('.', '');
    cpf = cpf.replace('-', '');
    return cpf;
  }

}
