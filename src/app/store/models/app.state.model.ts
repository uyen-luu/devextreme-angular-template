import {UserModel} from '@app/shared/models';

export interface AppState {
  readonly user: UserModel;
}

export interface IUser {
  id: number;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  jwtToken: string;
}
