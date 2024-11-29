import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioTramiteModel } from '../models/usuario_tramite.model';


const base_url = environment.URL_BASE

@Injectable({
  providedIn: 'root'
})
export class UsuariosTramiteService {

  usuario_tramite: UsuarioTramiteModel = new UsuarioTramiteModel();
  constructor(
    private readonly http: HttpClient
  ) { }

  guardarUsuarioTramite(data: Partial<UsuarioTramiteModel>){    
    this.usuario_tramite={...data};
    return this.http.post(`${base_url}/usuarios-tramite`, this.usuario_tramite);
  }

  buscarByNumTramiteActivo(num_tramite: number){
    return this.http.get<[usuarioTramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xnumtramite-activo?numero_tramite=${num_tramite}`)
  }

  buscarMediadorByNumTramiteActivo(num_tramite: number){
    return this.http.get<UsuarioTramiteModel>(`${base_url}/usuarios-tramite/buscar-mediador-xnumtramite-activo?numero_tramite=${num_tramite}`)
  }

  listarTramitesAsignadosTodos(){
    return this.http.get<[usuarioTramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite`)
  }

  listarTramitesAsignadosXUsuario(id_usuariox: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xusuario-asignados?id_usuario=${id_usuariox}`)
  }

  listarTramitesAsignadosXUsuarioAdministrado(id_usuariox: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xusuarioadministrado-asignados?id_usuario=${id_usuariox}`)
  }

  listarTramitesFinalizadosXUsuario(id_usuariox: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xusuario-finalizados?id_usuario=${id_usuariox}`)
  }

  listarTramitesFinalizadosXUsuarioXAnio(id_usuariox: number, anio: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xusuario-finalizados-xanio?id_usuario=${id_usuariox}&anio=${anio}`)
  }

  listarFinalizadosXUsuarioAdministrado(id_usuariox: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xusuarioadministrado-finalizados?id_usuario=${id_usuariox}`)
  }

  listarFinalizadosXUsuarioAdministradoXAnio(id_usuariox: number, anio: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xusuarioadministrado-finalizados-xanio?id_usuario=${id_usuariox}&anio=${anio}`)
  }

  listarTramitesAsignadosXCiudadano(id_ciudadanox: number){
    return this.http.get<[tramite:UsuarioTramiteModel[], total: number]>(`${base_url}/usuarios-tramite/buscar-xciudadano?id_ciudadano=${id_ciudadanox}`)
  }

  deshabilitarUsuarioTramite(id_usuario_tramite:number) {
    let data: Partial<UsuarioTramiteModel>;
    
    return this.http.patch(`${base_url}/usuarios-tramite/deshabilitar-usuario?id_usuario_tramite=${id_usuario_tramite}`,data);
  }

  
}
