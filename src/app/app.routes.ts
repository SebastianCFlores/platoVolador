import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { AppComponent } from './app.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { RegistrarIngredienteComponent } from './registrar-ingrediente/registrar-ingrediente.component';
import { RecetasComponent } from './recetas/recetas.component';
import { NuevaRecetaComponent } from './nueva-receta/nueva-receta.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
{path: '', redirectTo: 'home', pathMatch:'full'},
{path: 'home', component: HomeComponent},
{path: 'registro', component: RegistroComponent},
{path: 'cuenta', component: CuentaComponent},
{path: 'registraringrediente', component: RegistrarIngredienteComponent},
{path: 'recetas', component: RecetasComponent},
{path: 'nuevareceta', component: NuevaRecetaComponent}
];