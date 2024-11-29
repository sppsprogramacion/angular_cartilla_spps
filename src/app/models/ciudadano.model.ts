import { SexoModel } from './sexo.model';

export class CiudadanoModel{
    constructor(
        public id_ciudadano?: number,
        public dni?: number,
        public apellido?: string,
        public nombre?: string,
        public sexo_id?: number,
        public sexo?: SexoModel,       
        public telefono?: string,
        public fecha_nac?: Date,
        public email?: string,
        public clave?: string,
        //public clave?: string

    ){}
}