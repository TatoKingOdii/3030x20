import { createReducer, on } from '@ngrx/store';
import {Item} from "../../model/item";
import {Observable} from "rxjs";
import {AddContentActions} from "../../actions/add-content-action/add-content.actions";
import {AuthLoginActions} from "../../actions/auth-login-action/auth-login.actions";
import {AuthLogoutActions} from "../../actions/auth-logout-action/auth-logout.actions";
import {DeleteContentActions} from "../../actions/delete-content-action/delete-content.actions";
import {LoadContentActions} from "../../actions/load-content-action/load-content.actions";
import {LoadAuthActions} from "../../actions/load-auth-action/load-auth.actions";
import {SelectContentActions} from "../../actions/select-content-action/select-content.actions";
import {GlobalErrorActions} from "../../actions/global-error-action/global-error.actions";
import {state} from "@angular/animations";
import {UpdateContentActions} from "../../actions/update-content-action/update-content.actions";

export interface ContentState {
  loggedIn: boolean,
  selectedContent: Item | null,
  contentList: Item[] | null,
  contentSubscription$: Observable<Item[]> | null,
  errorMsg: string | null,
  isLoading: boolean,
  isSaving: boolean,
  isDeleting: boolean
}

export const initialState: ContentState = {
  loggedIn: false,
  contentList: [],
  contentSubscription$: null,
  selectedContent: null,
  errorMsg: null,
  isLoading: false,
  isSaving: false,
  isDeleting: false
};

export const contentReducer = createReducer(
  initialState,
  // Auth
  on(LoadAuthActions.loadAuthSuccess,
    (state, {loggedIn}) => ({...state, loggedIn: loggedIn})),
  on(AuthLoginActions.authLoginSuccess, state => ({...state, loggedIn: true})),
  on(AuthLoginActions.authLoginFailure, state => ({...state, loggedIn: false})),
  on(AuthLogoutActions.authLogout, state => ({...state, loggedIn: false})),

  // LoadContent
  on(LoadContentActions.loadContentTriggered,
    (state, {subscription}) =>({...state, contentSubscription: subscription, isLoading: true})),
  on(LoadContentActions.loadContentsSuccess,
    (state, {content}) => ({...state, contentList: content, contentSubscription: null, isLoading: false})),
  on(LoadContentActions.loadContentsFailure, state => ({...state, isLoading: false})),

  // Add Content
  on(AddContentActions.addContent, state => ({...state, isSaving: true})),
  on(AddContentActions.addContentSuccess, state => ({...state, selectedContent: null, isSaving: false})),
  on(AddContentActions.addContentFailure, state => ({...state, isSaving: false})),

  // Updating Content
  on(UpdateContentActions.updateContent, state => ({...state, isSaving: true})),
  on(UpdateContentActions.updateContentSuccess, UpdateContentActions.updateContentFailure, state => ({...state, isSaving: false})),

  // Delete Content
  on(DeleteContentActions.deleteContent, state => ({...state, isDeleting: true})),
  on(DeleteContentActions.deleteContentSuccess, state => ({...state, isDeleting: false})),
  on(DeleteContentActions.deleteSelectedContentSuccess, state => ({...state, selectedContent: null, isDeleting: false})),
  on(DeleteContentActions.deleteContentFailure, state => ({...state, isDeleting: false})),

  // Select Content
  on(SelectContentActions.selectContent, (state, {content}) => ({...state, selectedContent: content})),

  // Error Handling
  on(GlobalErrorActions.globalErrors, (state, {msg}) => ({...state, errorMsg: msg})),
);

