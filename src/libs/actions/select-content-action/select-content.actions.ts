import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Item} from "../../model/item";

export const SelectContentActions = createActionGroup({
  source: 'SelectContent',
  events: {
    'Select Content': props<{ content: Item | null }>(),
    'Select Content Failure': props<{ error: string }>(),
  }
});
