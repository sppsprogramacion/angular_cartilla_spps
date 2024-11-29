import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CentrosMediacionService } from '../../../service/centros-mediacion.service';
import { CentroMediacionModel } from '../../../models/centro_mediacion.model';
import { FiltroModel } from '../../../models/filtro.model';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { MunicipioModel } from '../../../models/municipio.model';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Message, MessageService } from 'primeng/api';
import { DataMokeadaService } from '../../../service/data-mokeada.service';

@Component({
  selector: 'app-centros-lista',
  templateUrl: './centros-mediacion-lista.component.html',
  providers: [MessageService],
  styleUrls: ['./centros-mediacion-lista.component.scss']
})
export class CentrosMediacionListaComponent implements OnInit {  

  //MENSAJES
  msgs: Message[] = [];   

  //PARA FILTRAR EN TABLA
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;

  //VARIABLES
  loading:boolean = true;
  municipioInvalid: boolean=false;
  departamentoInvalid: boolean= false;

  //VARIABLES CENTRO MEDIACION    
  centroMediacion: CentroMediacionModel;
  centroMediacionDialog: boolean;
  editarCentro: boolean = false;
  id_centro_editar:number = 0;
  tituloDialog: string = "";

  //LISTAS    
  listCentrosMediacion: CentroMediacionModel[]=[];
  listDepartamentos: DepartamentoModel[]=[];
  listMunicipios: MunicipioModel[]=[];
  listMunicipiosCompleto: MunicipioModel[]=[];
  filtroDepartamentos: FiltroModel[]=[];
  filtroMunicipios: FiltroModel[]=[];

  //FORMULARIOS
  formaCentroMediacion: FormGroup;  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly dataService: DataService,
    private dataMokeadaService: DataMokeadaService,
    private centrosMediacionService: CentrosMediacionService,
  ) {
    this.formaCentroMediacion = this.fb.group({
      centro_mediacion: ['',[Validators.required, Validators.pattern(/^[A-Za-z0-9./\s]+$/), Validators.minLength(2), Validators.maxLength(100)]],
      departamento_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      municipio_id: [1,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      localidad_barrio: [,[Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      calle_direccion: [,[Validators.required, Validators.minLength(1), Validators.maxLength(100)]],        
      numero_dom: [,[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      telefono: [,[Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],  
    
    });
  }

  //MENSAJES DE VALIDACIONES
  user_validation_messages = {    
    
    'centro_mediacion': [
      { type: 'required', message: 'El centro de mediacion es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar números, letras y espacios.' },
      { type: 'minlength', message: 'La cantidad mínima de caracteres es 2.' },
      { type: 'maxlength', message: 'La cantidad máxima de caracteres es 100.' }
    ],       
    'departamento_id': [
      { type: 'required', message: 'El departamento es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar números.' }
    ],
    'municipio_id': [
      { type: 'required', message: 'El municipio es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar números.' }
    ],
    'localidad_barrio': [
        { type: 'required', message: 'La localidad/barrio es requerido.' },
        { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
        { type: 'maxlength', message: 'La cantidad máxima de caracteres es 100.' }
    ],
    'calle_direccion': [
        { type: 'required', message: 'La calle/direccion es requerida' },
        { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
        { type: 'maxlength', message: 'La cantidad máxima de caracteres es 100.' }
    ],
    'numero_dom': [
      { type: 'required', message: 'El número de domicilio es requerido' },
      { type: 'pattern', message: 'Solo se pueden ingresar números.' }
    ],
    'telefono': [
      { type: 'required', message: 'El télefono es requerido.' },
        { type: 'minlength', message: 'La cantidad mínima de caracteres es 1.' },
        { type: 'maxlength', message: 'La cantidad máxima de caracteres es 100.' }
    ],    
    'email': [
      { type: 'required', message: 'El e-mail es requerido' },
      { type: 'pattern', message: 'El formato del e-mail no es correcto.' }
    ],
    
    
  }
  //FIN MENSAJES DE VALIDACIONES...............................................................

  //VALIDACIONES DE FORMULARIO
  isValid(campo: string): boolean{     
    
    return this.formaCentroMediacion.get(campo)?.invalid && this.formaCentroMediacion.get(campo)?.touched;      
  }
  //FIN VALIDACIONES DE FORMULARIO.......................................

  ngOnInit(): void {
    //CARGAR cENTROS DE MEDIACION
    this.listarCentrosMediacion();

    //CARGA DE LISTAS
    this.dataMokeadaService.listarDepartamentos().subscribe(departamentos => {
      this.listDepartamentos = departamentos;
    });

    this.dataMokeadaService.listarMunicipios().subscribe(municipios => {
      this.listMunicipiosCompleto= municipios;
    });
    
    //LISTAS PARA FILTROS
    this.filtroMunicipios = this.listMunicipiosCompleto.map(respuesta => {
      return {
        label: respuesta.municipio,
        value: respuesta.municipio,
       }
    });

    this.filtroDepartamentos = this.listDepartamentos.map(respuesta => {
      return {
        label: respuesta.departamento,
        value: respuesta.departamento,
       }
    });
    //FIN LISTAS PARA FILTROS.......................

    

    //FIN LISTAS.....................................
  }
  //FIN ONINIT........................................................

  //GUARDAR CENTRO
  submitFormUsuario(){
    this.msgs = [];
    this.departamentoInvalid = false;
    this.municipioInvalid = false;
    if(parseInt(this.formaCentroMediacion.get('departamento_id')?.value) == 1){      
      //this.msgs.push({ severity: 'error', summary: 'Datos inválidos', detail: 'Debe elegir un departamento. ' });
      this.departamentoInvalid=true;
    }
    if(this.formaCentroMediacion.get('municipio_id')?.value == 1){
      //this.msgs.push({ severity: 'error', summary: 'Datos inválidos', detail: 'Debe elegir un municipio. ' });
      this.municipioInvalid = true;
    } 
    if(this.formaCentroMediacion.invalid){  
      this.msgs.push({ severity: 'error', summary: 'Datos inválidos', detail: 'Revise los datos cargados. ' });
      return Object.values(this.formaCentroMediacion.controls).forEach(control => control.markAsTouched());
    }   
    

    let dataRegistro: Partial<CentroMediacionModel>;
    dataRegistro = {
      centro_mediacion: this.formaCentroMediacion.get('centro_mediacion')?.value,
      departamento_id: parseInt(this.formaCentroMediacion.get('departamento_id')?.value),
      municipio_id: parseInt(this.formaCentroMediacion.get('municipio_id')?.value),
      localidad_barrio: this.formaCentroMediacion.get('localidad_barrio')?.value,
      calle_direccion: this.formaCentroMediacion.get('calle_direccion')?.value,        
      numero_dom: parseInt(this.formaCentroMediacion.get('numero_dom')?.value),
      telefono: this.formaCentroMediacion.get('telefono')?.value,
      email: this.formaCentroMediacion.get('email')?.value, 
    };    
    
    //GUARDAR NUEVO CENTRO
    if(this.editarCentro==false){
      this.centrosMediacionService.guardarCentroMediacion(dataRegistro)        
        .subscribe({
          next: (resultado) => {
            let centroRes: CentroMediacionModel = resultado;
            this.hideDialogCentroMediacion();            
            Swal.fire('Exito',`El registro se realizó correctamente`,"success");
            this.listarCentrosMediacion();
          },
          error: (err) => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error al guardar', detail: ` ${err.error.message}` });
          }
        });
    }
    //FIN GUARDAR NUEVO CENTRO 

    //GUARDAR EDICION CENTRO
    if(this.editarCentro===true){
      this.centrosMediacionService.guardarEdicionCentroMediacion(this.id_centro_editar, dataRegistro)        
        .subscribe({
          next: (resultado) => {
            let centroRes: CentroMediacionModel = resultado;
            this.hideDialogCentroMediacion();            
            Swal.fire('Exito',`Se actualizó correctamente`,"success");
            this.listarCentrosMediacion();
          },
          error: (err) => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error al actualizar', detail: ` ${err.error.message}` });
          }
        });
    }
    //FIN GUARDAR EDICION CENTRO 
    
  } 
  //FIN GUARDAR CENTRO.................................................

  
  //LISTADO DE CENTROS DE MEDIACION
  listarCentrosMediacion(){    
    this.centrosMediacionService.listarCentroMediacionTodos().
        subscribe(respuesta => {
        this.listCentrosMediacion= respuesta[0];
        this.loading = false;  
    
    });
  }
  //FIN LISTADO DE CENTROS DE MEDIACION.......................................................

  //MANEJO DE FORMULARIO DIALOG
  openDialogCentroMediacion() {
    this.tituloDialog= "Nuevo centro mediacion";
    this.centroMediacionDialog = true;
  }

  editDialogCentroMediacion(data: CentroMediacionModel){
    this.tituloDialog="Editar centro de mediación";
    this.cargarMunicipios(data.departamento_id);
    this.id_centro_editar = data.id_centro_mediacion;
    this.formaCentroMediacion.get('centro_mediacion')?.setValue(data.centro_mediacion);
    this.formaCentroMediacion.get('departamento_id')?.setValue(data.departamento_id); 
    this.formaCentroMediacion.get('municipio_id')?.setValue(data.municipio_id);
    this.formaCentroMediacion.get('localidad_barrio')?.setValue(data.localidad_barrio);
    this.formaCentroMediacion.get('calle_direccion')?.setValue(data.calle_direccion);
    this.formaCentroMediacion.get('numero_dom')?.setValue(data.numero_dom);
    this.formaCentroMediacion.get('telefono')?.setValue(data.telefono);
    this.formaCentroMediacion.get('email')?.setValue(data.email);

    this.editarCentro = true;
    this.centroMediacionDialog = true;
  }
  
  hideDialogCentroMediacion() {
    this.formaCentroMediacion.reset();
    this.msgs = [];
    this.departamentoInvalid = false;
    this.municipioInvalid = false;
    this.listMunicipios=[];
    this.centroMediacionDialog = false;
    this.editarCentro = false;  
      //this.submitted = false;
  }    
  
  //FIN MANEJO FORMULARIO DIALOG....................................


  //CARGAR MUNICIPOS
  cargarMunicipios(id_departamento: number){
    this.listMunicipios=this.listMunicipiosCompleto.filter(municipio => {      
      return municipio.id_municipio == 1 || municipio.departamento_id == id_departamento;
    });    
  }

  onChangeDepartamento(){
    const id = this.formaCentroMediacion.get('departamento_id')?.value;
    if(id != null){               
        this.cargarMunicipios(parseInt(id.toString()));
        this.formaCentroMediacion.get('municipio_id')?.setValue(1);               
        this.formaCentroMediacion.get('municipio_id')?.markAsUntouched();
        
    }
  }
  //FIN CARGAR MUNICIPOS..........................................................................

  //LIMPIAR FILTROS
  clear(table: Table) {    
    table.clear();
    this.filter.nativeElement.value = '';
  } 
  //FIN LIMPIAR FILTROS....................................................................................  

  //ACCEDER A DATA SERVICE
  administrarCentroMediacion(data: CentroMediacionModel){
    this.dataService.centroMediacionData = data;
    this.router.navigateByUrl("admin/centro-mediacion/administrar");
  }
  //FIN ACCEDER A DATA SERVICE

}
