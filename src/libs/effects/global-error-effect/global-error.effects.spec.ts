import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GlobalErrorEffects } from './global-error.effects';

describe('GlobalErrorEffects', () => {
  let actions$: Observable<any>;
  let effects: GlobalErrorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalErrorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(GlobalErrorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
