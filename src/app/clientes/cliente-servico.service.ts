import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicoService {

  private URL = environment.url;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  listarClientesComPaginacao(pagina: number): Observable<any>{
      return this.http.get(this.URL + `/clientes/page?pagina=${pagina}`)
  }

  inserirCliente(cliente: any): Observable<any>{
      let options = { headers: this.headers }
      return this.http.post(this.URL + "/clientes", cliente, options);
  }



  consultarCep(numero: string): Observable<any>{
      return this.http.get(this.URL + `/cep/${numero}`);
  }
  

}
