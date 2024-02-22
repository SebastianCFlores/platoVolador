import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Recipe } from '../models/recipe';
import { HttpClient, HttpHeaders} from '@angular/common/http';
type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
};

@Component({
  selector: 'app-recetas',
  standalone: true,
  template: `
    <div class="container responsive-grid">
      <mat-card *ngFor="let recipe of recipe()">
        <mat-card-header>
          <mat-card-title>{{ recipe.nombre }}</mat-card-title>
        </mat-card-header>
        <br/>
        <img mat-card-image [src]="recipe.imagenurl" />
        <mat-card-content>
          <br/>
          <p>
            {{ recipe.descripcion }}
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>Ver Receta</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container{
        padding: 24px;
      }
      img {
        width: 100%;
        height: 200px;
        object-fir: cover;
      }
      .responsive-grid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 24px;
      }
    `,
  ],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  //templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
// export class RecetasComponent implements OnInit {
//   usuarios: any[] = [];

//   ngOnInit(): void {
//     this.obtenerUsuarios();
//   }

//   obtenerUsuarios(): void {
//     const apiUrl = 'http://localhost:3000/api/usuario';

//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         this.usuarios = data;
//       })
//       .catch(error => {
//         console.error('Error al obtener usuarios', error);
//       });
//   }
export class RecetasComponent implements OnInit{
  recipe = signal<Recipe[]>([]);
  API_URI = 'http://localhost:3000';
  // identificador de imagen en unsplash
  // images = [
  //   'kr9HOdBFjuk',
  //   'ifjEbN18R44',
  //   'urMbGaBBjbg',
  //   '05_yqWFbc2E',
  //   'O2hktlhRAyg',
  //   'Jd3Ai-1f9H0',
  //   'SWbCLJBDVnA',
  //   'x7peUIju0u0',
  //   'vH0UeskIkD8',
  //   'sm-LdPd-Ilc',
  // ];
  recipes: Recipe[] = [];
  ngOnInit() {
    
  }

  getRecipes(){
    this.http.get<Recipe[]>(`${this.API_URI}/getrecipes`).subscribe(
      (res) => {this.recipes = res}
    );
  }

  constructor(private http: HttpClient){
    this.getRecipes();
    const recipes: Recipe[] = [];
    for(let i=0; i < this.recipes.length; i++){
      recipes.push(
        // title: `Card ${i + 1}`,
        // description: `Far far away, behind the word mountains, far from the countries Vokalia and
        // Consonantia, there`,
        // imageUrl: `https://source.unsplash.com/${this.images[i]}/300X300`,
        this.recipes[i]
      );
    }
    this.recipe.set(recipes);
  }
}
