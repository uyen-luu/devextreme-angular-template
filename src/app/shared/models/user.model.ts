export class UserModel {
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
