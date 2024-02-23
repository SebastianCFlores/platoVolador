import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  hide = true;
  isSubmitted: boolean = false;
  formTemplate = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required),
    
  })


  onSubmit(formValue: any){
    this.isSubmitted = true;
  }


  get formControls(){
    return this.formTemplate['controls'];
  }
}
