import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {AuthLoginActions} from "../../actions/auth-login-action/auth-login.actions";
import {AuthLogoutActions} from "../../actions/auth-logout-action/auth-logout.actions";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {SelectContentActions} from "../../actions/select-content-action/select-content.actions";
import {UpdateContentActions} from "../../actions/update-content-action/update-content.actions";
import {map, tap} from "rxjs";
import {GlobalErrorActions} from "../../actions/global-error-action/global-error.actions";



@Injectable()
export class GlobalErrorEffects {

  constructor(private actions$: Actions) {}

  globalErrorHandler$ = createEffect(() => this.actions$.pipe(
    ofType(AddContentActions.addContentFailure, AuthLoginActions.authLoginFailure, AuthLogoutActions.authLogoutFailure,
      DeleteContentActions.deleteContentFailure, LoadAuthActions.loadAuthFailure, LoadContentActions.loadContentsFailure,
      SelectContentActions.selectContentFailure, UpdateContentActions.updateContentFailure),
    map(action => GlobalErrorActions.globalErrors({msg: action.error}))
  ));
}
