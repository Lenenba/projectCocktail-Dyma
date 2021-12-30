//modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//components
import { IngredientListComponent } from './panier-container/ingredient-list/ingredient-list.component';
import { PanierContainerComponent } from './panier-container/panier-container.component';

//routes
import { PANIER_ROUTES } from './panier.routes';



@NgModule({
  declarations: [
    PanierContainerComponent,
    IngredientListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PANIER_ROUTES)

  ]
})
export class PanierModule { }
