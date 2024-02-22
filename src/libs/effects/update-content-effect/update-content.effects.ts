import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContentService} from "../../services/content-service/content.service";
import {catchError, exhaustMap, map, of, tap, throwError} from "rxjs";
import {UpdateContentActions} from "../../actions/update-content-action/update-content.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";

@Injectable()
export class UpdateContentEffects {

  constructor(private actions$: Actions, private contentService: ContentService) {}

  // Initial update handler
  updateContent$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateContentActions.updateContent),
    exhaustMap( (action) =>
      this.contentService.updateContent(action.content).pipe(
        tap(value => console.log('UCE Update Content Res: ' + JSON.stringify(value))),
        map(UpdateContentActions.updateContentSuccess),
        catchError(() =>
          of(UpdateContentActions.updateContentFailure({error: 'Failed to update content: ' + action.content.name}))))
    )
  ));

  // Refresh on success
  updateContentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateContentActions.updateContentSuccess),
    tap(() => {
      console.log('UCE Update Success!');
      this.contentService.resetSelectedContent();
    }),
    map(LoadContentActions.loadContents)
  ));
}
