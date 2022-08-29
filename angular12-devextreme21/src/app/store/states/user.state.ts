import {Injectable} from '@angular/core';
import {SetLoggedUser} from '@app/store/actions';
import {IUser} from '@app/store/models';
import {
  Action,
  Selector,
  State,
  StateContext
} from '@ngxs/store';

export class UserStateModel {
  user: IUser;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null
  }
})

@Injectable()
export class UserState{

  constructor() {
  }

  @Selector()
  static user(state: UserStateModel) {
    return state.user;
  }

  @Action(SetLoggedUser)
  setLoggedUser({getState, patchState}: StateContext<UserStateModel>, {payload}: SetLoggedUser) {
    patchState({
      user: payload
    });
  }
}
