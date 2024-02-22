import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";
import {catchError, map, of} from "rxjs";


@Injectable()
export class LoadAuthEffects {


  constructor(private actions$: Actions) {}

  loadAuth$ = createEffect(() => this.actions$.pipe(
    ofType(LoadAuthActions.loadAuth),
    map(() => {
      const storageUser = sessionStorage.getItem('currentUser');
      console.log('LAE AuthLC: ' + storageUser);
      return LoadAuthActions.loadAuthSuccess({loggedIn: storageUser !== null});
    }),
    catchError(() => of(LoadAuthActions.loadAuthFailure({error: 'Failed to load current user auth!'})))
  ));
}
