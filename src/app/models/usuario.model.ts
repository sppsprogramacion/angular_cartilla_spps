import { SexoModel } from './sexo.model';
import { ProvinciaModel } from './provincia.model';
import { DepartamentoModel } from './departamento.model';
import { MunicipioModel } from './municipio.model';
import { CentroMediacionModel } from './centro_mediacion.model';
import { RolModel } from './rol.model';


export class UsuarioModel{
    constructor(
        public id_usuario?: number,
        public dni?: number,
        public legajo?: number,
        public apellido?: string,
        public nombre?: string,    
        public sexo_id?: number,
        public sexo?: SexoModel,   
        public telefono?: string,
        public email?: string,
        public rol_id?: string,
        public rol?: RolModel,
        public organismo_id?: string,
        public organismo?: RolModel,
        public clave?: string,
        public activo?: boolean,
        public centros_mediacion?: CentroMediacionModel[]

    ){}
}