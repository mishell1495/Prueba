import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

   usuario:UsuarioModel;
   recordarme= false;
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit() { 

    this.usuario = new UsuarioModel();   
  }

  onSubmit(form: NgForm){
    if(form.invalid){return;}
    Swal.fire({       
      text: 'Espere por favor..'
  });
  Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe(resp =>{
      Swal.close();      
      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }else{
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/home');
    },(err)=>{
      //alert(err.error.error.message);
        Swal.fire({  
          timer: 2000,
          title: 'Error al autenticar',    
          text:err.error.error.message
      });
    });
  }


}
