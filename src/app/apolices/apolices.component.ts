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
      cpfCliente: [null, Validators.required]
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

  onSubmit(){
    console.log(this.formularioApolice.controls);
    let jsonCliente = JSON.stringify(this.formularioApolice.value);
    
    if(true){
      this.apoliceServico.inserirApolice(jsonCliente).subscribe(response => {
        alert('Apólice cadastrada com sucesso!');
        location.reload();
      }, 
        error => {alert(error.error.causa)});
    }else{
      alert('Todos os campos devem ser preenchidos.');
      console.log(!this.validarForm);
    }
  }

  limparFormulario(){
    this.formularioApolice.reset();
  }

  validarForm(){
    console.log(this.apolicesPaginadas.controls.endereco.get('numero'). status)
    const status = 'INVALID';
      // if(this.validadorForm || this.apolicesPaginadas.controls.cpf.status == status
      //   || this.apolicesPaginadas.controls.nome.status == status || this.apolicesPaginadas.controls.endereco.get('numero'). status == status){
      //   return true;
      // }else{
      //   return false;
      // }
  }

}
