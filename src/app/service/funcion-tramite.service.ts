import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FuncionTtramiteModel } from '../models/funcion_tramite.model';

const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class FuncionTramiteService {

  funcionTramite: FuncionTtramiteModel = new FuncionTtramiteModel();
  constructor(
    private readonly http: HttpClient
  ) { }

  guardarFuncionTramite(data: Partial<FuncionTtramiteModel>){    
    this.funcionTramite={...data};
    return this.http.post(`${base_url}/funcion-tramite`, this.funcionTramite);
  }

  listarFuncionTramitesTodos(){
    return this.http.get<[funcionTramite:FuncionTtramiteModel[], total: number]>(`${base_url}/funcion-tramite`)
  }

  
}
