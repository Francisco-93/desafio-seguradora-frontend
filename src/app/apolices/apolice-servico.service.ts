import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApoliceServicoService {

  private URL = environment.url;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  listarApolicesComPaginacao(pagina: number): Observable<any> {
    return this.http.get(this.URL + `/apolices/page?pagina=${pagina}`);
  }

  inserirApolice(apolice: any): Observable<any> {
    let options = { headers: this.headers }
    return this.http.post(this.URL + '/apolices', apolice, options);
  }

  buscarApolicePorNumero(numeroDaApolice: any): Observable<any> {
      return this.http.get(this.URL + `/apolices/${numeroDaApolice}`);
  }

  atualizarApolice(apolice: any){
    let options = { headers: this.headers }
    return this.http.post(this.URL + '/apolices', apolice, options);
  }

  excluirApolice(numeroDaApolice: any){
      return this.http.delete(this.URL + `/apolices/${numeroDaApolice}`);
  }

  buscarClientePorCpf(cpf: string): Observable<any> {
    return this.http.get(this.URL + `/clientes/cpf/${cpf}`);
  }

}
