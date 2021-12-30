import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, tap, map } from 'rxjs';
import { Cocktail } from '../interfaces/cocktail.interface';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  public cocktails$: BehaviorSubject<Cocktail[] | null> = new BehaviorSubject<Cocktail[] | null>(null)

  public getCocktail(index:number): Observable<Cocktail | null> {
    return this.cocktails$.pipe(
      filter((cocktails : Cocktail[] | null) => cocktails !== null),
      map((cocktails : Cocktail[] | null) => {
        return cocktails![index]
      })
    )
  }

  public addCocktail(cocktail: Cocktail) : Observable<Cocktail> {
    return this.http.post<Cocktail>('https://restapi.fr/api/julescocktails', cocktail).pipe(
      tap((savedCocktail : Cocktail) => {
        const value = this.cocktails$.value;
        this.cocktails$.next([...value!, savedCocktail])
      })
    )
  }

  public editCocktail(cocktailId: any,  editedCocktail: Cocktail) : Observable<Cocktail>  {
    return this.http.patch<Cocktail>(`https://restapi.fr/api/julescocktails/${ cocktailId  }`, editedCocktail).pipe(
    tap((savedCocktail : Cocktail) => {
      const value =  this.cocktails$.value;
      this.cocktails$.next(value!.map((cocktail: Cocktail) => {
        if(cocktail.name === savedCocktail.name){
          return savedCocktail ;
        } else {
          return cocktail;
        }
      }))
    })
  )

  }

  public getAllCocktails() : Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>('https://restapi.fr/api/julescocktails').pipe(
      tap((cocktails: Cocktail[]) => {
        this.cocktails$.next(cocktails)
      })
    )
  }

  constructor(private http: HttpClient) {
    //  this.seed();
  }

  // public seed() {
  //    this.http.post('https://restapi.fr/api/julescocktails',  {
  //     name: 'Mojito',
  //     img:'https://www.hangoverweekends.co.uk/media/15505/mojito.jpg?width=500&height=375',
  //     description:'The Mojito complimenting summer perfectly with a fresh minty taste. The mixture of white rum, mint, lime juice, sugar and soda water is crisp and clean with a relatively low alcohol content, the soda water can be replaced with sprite or 7-up. When preparing a mojito always crush the mint leaves as opposed to dicing to unlock oils that will assist with enhancing the minty flavour.',
  //     ingredients:[
  //       {
  //       name:'Menthe',
  //       quantity:1
  //       },
  //       {
  //         name:'Perrier',
  //         quantity:1
  //       },
  //       {
  //         name:'Rhum',
  //         quantity:3
  //       }]
  //     }).subscribe();

  //     this.http.post('https://restapi.fr/api/julescocktails',  {
  //       name: 'Mai Tai',
  //       img:'https://www.hangoverweekends.co.uk/media/15506/mm-cocktail-guide-maitai-590x375.jpg?width=434px&height=276px',
  //       description:'The Mojito complimenting summer perfectly with a fresh minty taste. The mixture of white rum, mint, lime juice, sugar and soda water is crisp and clean with a relatively low alcohol content, the soda water can be replaced with sprite or 7-up. When preparing a mojito always crush the mint leaves as opposed to dicing to unlock oils that will assist with enhancing the minty flavour.',
  //       ingredients:[
  //         {
  //           name:'Cramberry',
  //           quantity:1
  //         },
  //         {
  //           name:'Citron',
  //           quantity:2
  //         },
  //         {
  //           name:'Vodka',
  //           quantity:1
  //         }]
  //     }).subscribe();

  //     this.http.post('https://restapi.fr/api/julescocktails', {
  //       name: 'Mint Julep',
  //       img:'https://www.hangoverweekends.co.uk/media/15504/bulleitmintjulep_l.jpg?width=300&height=300',
  //       description:'The Mojito complimenting summer perfectly with a fresh minty taste. The mixture of white rum, mint, lime juice, sugar and soda water is crisp and clean with a relatively low alcohol content, the soda water can be replaced with sprite or 7-up. When preparing a mojito always crush the mint leaves as opposed to dicing to unlock oils that will assist with enhancing the minty flavour.',
  //       ingredients:[
  //         {
  //           name:'Rhum',
  //           quantity:1
  //         },
  //         {
  //           name:'Citron',
  //          quantity:1
  //         },
  //         {
  //           name:'Triple sec',
  //           quantity:1

  //         }]
  //     }).subscribe();

  //     this.http.post('https://restapi.fr/api/julescocktails', {
  //       name: 'Caipirinha',
  //       img:'https://www.hangoverweekends.co.uk/media/15503/caipirinha-cocktail.jpg?width=400&height=300',
  //       description:'The Mojito complimenting summer perfectly with a fresh minty taste. The mixture of white rum, mint, lime juice, sugar and soda water is crisp and clean with a relatively low alcohol content, the soda water can be replaced with sprite or 7-up. When preparing a mojito always crush the mint leaves as opposed to dicing to unlock oils that will assist with enhancing the minty flavour.',
  //       ingredients:[
  //         {
  //         name:'Menthe',
  //         quantity:1
  //         },
  //         {
  //           name:'Perrier',
  //           quantity:1
  //         },
  //         {
  //           name:'Rhum',
  //           quantity:3
  //         }
  //       ]
  //     }).subscribe();
  // }
}
