import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../../../shared/interfaces/ingredient.interface';
import { PanierService } from '../../../shared/services/panier.service';

@Component({
  selector: 'app-panier-container',
  templateUrl: './panier-container.component.html',
  styleUrls: ['./panier-container.component.scss']
})
export class PanierContainerComponent {

  public ingredients$ : Observable<Ingredient[]|null> = this.panierService.ingredients$;
  constructor(private panierService: PanierService) { }

}
