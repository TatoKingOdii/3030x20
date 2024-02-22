import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GlobalErrorActions = createActionGroup({
  source: 'GlobalError',
  events: {
    'Global Errors': props<{ msg: string | null }>(),
  }
});
