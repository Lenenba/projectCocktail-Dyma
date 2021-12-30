import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  { path: '', redirectTo:'cocktails', pathMatch:'full'},
  { path: 'cocktails',
    loadChildren: () =>
      import('./features/cocktail/cocktail.module').then(
        (m) => m.CocktailModule)},
  { path: 'panier',
    loadChildren: () =>
      import('./features/panier/panier.module').then(
        (m) => m.PanierModule)},
]
