import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {NavService} from "../../libs/services/nav-service/nav.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContentFacade} from "../../libs/facade/content-facade/content-facade.facade";
import {filter} from "rxjs";
import {Store} from "@ngrx/store";
import {ContentState} from "../../libs/reducers/content-reducer/content.reducer";
import {GlobalErrorActions} from "../../libs/actions/global-error-action/global-error.actions";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MatToolbar,
    MatProgressSpinner,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public readonly navService: NavService,
              private snackBar: MatSnackBar,
              public readonly contentFacade: ContentFacade,
              private store: Store<{content: ContentState}>) {
    // Sub to the global error stream to pop them up
    this.contentFacade.getErrorMsg().pipe(filter(msg => msg !== null))
      .subscribe(msg => {
        let snackRef = this.snackBar.open(msg!, '', {duration: 3000});

        // Reset state after we open the snackbar
        snackRef.afterOpened().subscribe(() =>
          this.store.dispatch(GlobalErrorActions.globalErrors({msg: null}))
        );
      });
  }
}
