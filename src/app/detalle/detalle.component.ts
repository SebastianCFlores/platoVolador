import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Recipe } from '../models/recipe';
import { Ingredients } from '../models/ingredients';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  recipe: Recipe = {nombre: '', descripcion: '', imagenurl: ''};
  ingredients: Ingredients[] = [];
  API_URI = 'http://localhost:3000';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.recipe = params as Recipe;
    });
    this.retrieveIngredientsByID();
  }
  retrieveIngredientsByID(){
    this.http.get<Ingredients[]>(`${this.API_URI}/getingredients/${this.recipe.id}`).subscribe(
      (res) => {this.ingredients = res}
    );
    console.log(this.ingredients);
  }

}
