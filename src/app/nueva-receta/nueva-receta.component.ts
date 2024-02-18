import { Component } from '@angular/core';
//import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
//import {getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getStorage, provideStorage, Storage} from '@angular/fire/storage';
@Component({
  selector: 'app-nueva-receta',
  standalone: true,
  imports: [],
  templateUrl: './nueva-receta.component.html',
  styleUrl: './nueva-receta.component.css'
})
export class NuevaRecetaComponent {
  

  constructor(private storage: Storage){
    
  }

}
