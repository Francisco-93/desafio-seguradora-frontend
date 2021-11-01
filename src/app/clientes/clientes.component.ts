import { ClienteServicoService } from './cliente-servico.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteServicoService]
})
export class ClientesComponent implements OnInit {

  private clientesPaginados: any;
  private paginaAtual: number;
  private ultimaPagina: number;
  private clientes: Cliente[];
  private validadorForm: boolean = false;

  formularioCliente: FormGroup;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private clienteServico: ClienteServicoService,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.formularioCliente = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      endereco: this.formBuilder.group({
        id: [null],
        cep: [null, Validators.required],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        uf: [null, Validators.required],
        cidade: [null, Validators.required],
        numero: [null, Validators.required]
      })
    })
  }

  ngOnInit() {
    this.listarClientesPaginado(0);
  }

  listarClientesPaginado(pagina: number) {
    this.clienteServico.listarClientesComPaginacao(pagina).subscribe(response => {
      this.clientesPaginados = response;
      console.log(this.clientesPaginados);
      this.paginaAtual = pagina + 1;
      this.ultimaPagina = this.clientesPaginados.totalPages;
      this.clientes = this.clientesPaginados.content;
      console.log(this.clientes);
    })
  }

  onSubmit() {
    console.log(this.formularioCliente.controls);
    let jsonCliente = JSON.stringify(this.formularioCliente.value);

    if (!this.validarForm()) {
      this.clienteServico.inserirCliente(jsonCliente).subscribe(response => {
        alert('Cliente cadastrado com sucesso!');
        location.reload();
      },
        error => { alert(error.error.causa) });
    } else {
      alert('Todos os campos devem ser preenchidos.');
      console.log(!this.validarForm);
    }
  }

  limparFormulario() {
    this.formularioCliente.reset();
  }

  consultaCep(cep: string) {
    this.blockUI.start('Carregando...');
    this.clienteServico.consultarCep(cep).subscribe(response => {
      this.formularioCliente.get('endereco').patchValue({
        cep: response.cep,
        logradouro: response.logradouro,
        bairro: response.bairro,
        uf: response.uf,
        cidade: response.localidade
      });
      if (this.formularioCliente.get('logradouro') === null) {
        alert('CEP inválido');
      }
      console.log(response);
    }, error => {
      alert('CEP inválido');
      this.validadorForm = true;
    })
    this.blockUI.stop();
  }

  validarForm() {
    console.log(this.formularioCliente.controls.endereco.get('numero').status)
    const status = 'INVALID';
    if (this.validadorForm ||
      this.formularioCliente.controls.cpf.status == status ||
      this.formularioCliente.controls.nome.status == status ||
      this.formularioCliente.controls.endereco.status == status ||
      this.formularioCliente.controls.endereco.get('numero').status == status) {
      return true;
    } else {
      return false;
    }
  }

}
