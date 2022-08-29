import {IUser} from '@app/store/models';

export class UserModel implements IUser{
  id: number;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  jwtToken: string;

  constructor(init?: Partial<UserModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
