import {UserModel} from '@app/shared/models';

export class SetLoggedUser {
  static readonly type = '[USER] Set User';

  constructor(public payload: UserModel ) {
  }
}
