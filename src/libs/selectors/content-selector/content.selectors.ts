import {ContentState} from "../../reducers/content-reducer/content.reducer";
import {Item} from "../../model/item";
import {Observable} from "rxjs";
import {createSelector} from "@ngrx/store";

export const selectSelectedContent = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Selected content: ' + JSON.stringify(state.content.selectedContent));
    return state.content.selectedContent;
  },
  (selectedContent: Item | null) => selectedContent
);

export const selectContentList = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Content List: ' + JSON.stringify(state.content.contentList));
    return state.content.contentList
  },
  (contentList: Item[] | null ) => contentList
);

export const selectLoadSubscription = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Subscription: ' + state.content.contentSubscription$);
    return state.content.contentSubscription$;
  },
  (contentSubscription: Observable<Item[]> | null) => contentSubscription
);

export const selectAuthStatus = createSelector(
  (state: {content: ContentState}) => {
    //console.log('SL State: ' + JSON.stringify(state));
    console.log('SL Auth: ' + state.content.loggedIn);
    return state.content.loggedIn;
  },
  (loggedIn: boolean) => loggedIn
);

export const selectErrorMsg = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Error Msg');
    return state.content.errorMsg;
  },
  (errorMsg: string | null) => errorMsg
);

export const selectLoading = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Select Loading');
    return state.content.isLoading;
  },
  (isLoading: boolean) => isLoading
);

export const selectSaving = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Select Saving');
    return state.content.isSaving;
  },
  (isSaving: boolean) => isSaving
);

export const selectDeleting = createSelector(
  (state: {content: ContentState}) => {
    console.log('SL Select Deleting');
    return state.content.isDeleting;
  },
  (isDeleting: boolean) => isDeleting
);

export const selectProcessing = createSelector(
  selectLoading,
  selectSaving,
  selectDeleting,
  (isLoading: boolean, isSaving: boolean, isDeleting: boolean) => isLoading || isSaving || isDeleting
);
