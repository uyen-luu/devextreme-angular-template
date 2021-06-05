import {UserModel} from '@app/shared/models';
import {Action} from '@ngrx/store';
//
export enum UserActionType {
  GET_USER = '[USER] Get User',
}

export class GetUser implements Action {
  readonly type = UserActionType.GET_USER;

  //add an optional payload
  constructor(public payload: UserModel) {
  }
}

export type UserAction = UserActionType;
