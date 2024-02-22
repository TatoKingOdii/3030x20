import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item} from "../../model/item";

export const DeleteContentActions = createActionGroup({
  source: 'DeleteContent',
  events: {
    'Delete Content': props<{ content: Item }>(),
    'Delete Content Success': props<{ id: string }>(),
    'Delete Selected Content Success': emptyProps(),
    'Delete Content Failure': props<{ error: string }>(),
    'Delete NoOp': emptyProps()
  }
});
