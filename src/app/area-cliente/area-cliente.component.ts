import { ClienteServicoService } from '../clientes/cliente-servico.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-area-cliente',
  templateUrl: './area-cliente.component.html',
  styleUrls: ['./area-cliente.component.css']
})

export class AreaClienteComponent implements OnInit {

  private validadorForm: boolean = false;

  formularioCliente: FormGroup;

  private idClienteAtivo: any;
  private urlObserver: Subscription;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private clienteServico: ClienteServicoService,
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
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
    this.obterIdRota()
    this.obterCliente(this.idClienteAtivo);
  }

  obterIdRota() {
    this.urlObserver = this.routeActive.params.subscribe(url => {
      this.idClienteAtivo = url['id'];
    })
  }

  onSubmit() {
    console.log(this.formularioCliente.controls);
    let jsonCliente = JSON.stringify(this.formularioCliente.value);

    if (!this.validarForm()) {
      this.clienteServico.atualizarCliente(jsonCliente).subscribe(response => {
        alert('Cliente atualizado com sucesso!');
        this.router.navigate(['/clientes']);
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
    }, error => {
      alert('CEP inválido')
      this.validadorForm = true;
    })
    this.blockUI.stop();
  }

  validarForm() {
    console.log(this.formularioCliente.controls.endereco.get('numero').status)
    const status = 'INVALID';
    if (this.validadorForm || this.formularioCliente.controls.cpf.status == status
      || this.formularioCliente.controls.nome.status == status || this.formularioCliente.controls.endereco.get('numero').status == status) {
      return true;
    } else {
      return false;
    }
  }

  voltarListagemClientes() {
    this.router.navigate(['/clientes']);
  }

  obterCliente(id) {
    this.clienteServico.buscarClientePorId(id).subscribe(response => {
      this.formularioCliente.patchValue({
        id: response.id,
        nome: response.nome,
        cpf: response.cpf
      })
      this.formularioCliente.get('endereco').patchValue({
        id: response.endereco.id,
        cep: response.endereco.cep,
        logradouro: response.endereco.logradouro,
        bairro: response.endereco.bairro,
        uf: response.endereco.uf,
        cidade: response.endereco.cidade,
        numero: response.endereco.numero
      })
    })
  }

  excluirCliente() {
    this.clienteServico.excluirCliente(this.idClienteAtivo).subscribe(response => {
      alert('Cliente excluído com sucesso!');
      this.router.navigate(['clientes']);
    }, error => {
      alert(error.error.causa);
    })
  }


}
