import { Component, OnInit, inject} from '@angular/core';
//import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
//import {getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { uploadBytes, Storage, ref, getDownloadURL} from '@angular/fire/storage';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { finalize} from 'rxjs/operators';
//import { Observable } from 'rxjs';
import {docSnapshots } from '@angular/fire/firestore';
//import { getStorage } from '@angular/fire/storage';
//import { initializeApp } from '@angular/fire/app';
import { initializeApp } from "firebase/app";
import { uploadBytes,uploadBytesResumable, ref, getDownloadURL, getStorage} from 'firebase/storage';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { Ingredients, Numero } from '../models/ingredients';
@Component({
  selector: 'app-nueva-receta',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './nueva-receta.component.html',
  styleUrl: './nueva-receta.component.css'
})
export class NuevaRecetaComponent implements OnInit{
  imgSrc : string = '../assets/images/sourceim.png';
  selectedImage: any = null;
  isSubmitted: boolean = false;
  firebaseConfig = {
    apiKey: "AIzaSyBuC96tE6qc2n2ncqmDzQtHKz-meY9IqYc",
    authDomain: "miprimertestapp-9b2c3.firebaseapp.com",
    projectId: "miprimertestapp-9b2c3",
    storageBucket: "miprimertestapp-9b2c3.appspot.com",
    messagingSenderId: "33710573890",
    appId: "1:33710573890:web:64ad33f06a425dea2de0db"
  };
  app = initializeApp(this.firebaseConfig);
  API_URI = 'http://localhost:3000';
  ingredients: Ingredients[] = [];
  recipeIndex: Recipe[] = [];
  //storage = inject(Storage);
  // downloadURL: Observable<string>;

  // formTemplate = new FormGroup({
  //   name : new FormControl(''),
  //   description : new FormControl(''),
  //   imageUrl : new FormControl('')
  // })
  formTemplate = new FormGroup({
    name : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    steps : new FormControl('', Validators.required),
    imageUrl : new FormControl('', Validators.required),
    note : new FormControl('', ),
    ingredient : new FormControl('',)
  })

  constructor(private http: HttpClient){}
  ngOnInit() {
      this.resetForm();
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '../assets/images/sourceim.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue: any){
    this.isSubmitted = true;
    const storage = getStorage(this.app);
    if(this.formTemplate.valid){
      //console.log('valido');
      var filePath = `${this.selectedImage.name}_${new Date().getTime()}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, this.selectedImage);
      uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          formValue['imageurl'] = downloadURL;
          const recipe = {
            nombre : formValue['name'],
            descripcion : formValue['description'],
            imagenurl : downloadURL
          }
          console.log(formValue['ingredient']);
          this.saveRecipe(recipe);
          this.ingredients = formValue['ingredient'];
          //console.log(typeof(this.recipeIndex[0]));
          // console.log(`${this.recipeIndex[0]} ${this.ingredients[0].id}`);
          // console.log(`${formValue['ingredient'][0].id}`);
          // console.log(typeof(formValue['ingredient'][0]));
          // this.bindRecipeIngredient(formValue['ingredient'][0]);
          
          this.ingredients.forEach(item => {
            this.bindRecipeIngredient(item);
          });
          //this.retrieveIngredients();
          this.resetForm();
        });
      }
    );
      
      // uploadBytes(ref(storage, filePath), this.selectedImage).then((snapshot) => {
      //   snapshot.pipe(
      //     getDownloadURL(ref(storage, filePath))
      //   .then((url: any) => {
      //     formValue['imageurl'] = url;
      //     const recipe = {
      //       nombre : formValue['name'],
      //       descripcion : formValue['description'],
      //       imagenurl : url
      //     }
      //     this.saveRecipe(recipe)
          
          
      //     this.resetForm();
      //   });
      //   )
      // });
      
        
      // .subscribe(
          //   res => {
          //     console.log(res);   
          //   },
          //   err => console.error(err)
          // );
      // const storageRef = ref(this.storage, filePath);

      // const uploadTask = 
      // uploadBytes(storageRef, this.selectedImage).docSnapshots().pipe(
      //   finalize(() => {
      //       storageRef.getDownloadURL().subscribe((url: any)=>{
      //         formValue['imageUrl'] = url;
      //       })
      //   })
      // ).subscribe();
    }
  }
  
  get formControls(){
    return this.formTemplate['controls'];
  }
  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      description: '',
      imageUrl: '',
      steps: '',
      note: '',
      ingredient: ''
    });
    this.imgSrc = '../assets/images/sourceim.png';
    this.retrieveIngredients();
    this.selectedImage=null;
    this.isSubmitted=false;
  }

  saveRecipe(recipe: Recipe){

    this.http.post(`${this.API_URI}/recipes`, recipe).subscribe((res: any) => {
      alert('Recipe created');
    });
  }
  bindRecipeIngredient(ingredient: Ingredients){
    //const id = '\"${index}\"'
    //const id = String(index);
    //const ing = ingredient as Ingredients;
    this.http.post(`${this.API_URI}/relation`, ingredient).subscribe((res: any) => {
      alert('User created');
    });
  }
  retrieveIngredients(){
    this.http.get<Ingredients[]>(`${this.API_URI}/ingredients`).subscribe(
      (res) => {this.ingredients = res}
    );
  }

}
