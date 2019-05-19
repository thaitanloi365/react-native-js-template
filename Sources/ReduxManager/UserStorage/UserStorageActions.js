// @flow
import { ActionTypes } from './UserStorageActionTypes';

function saveUserToken<T>(userToken: T) {
  return {
    type: ActionTypes.SAVE_USER_TOKEN,
    payload: userToken,
  };
}

function deleteUserToken() {
  return { type: ActionTypes.DELETE_USER_TOKEN };
}

function saveUserProfile<T>(userProfile: T) {
  return {
    type: ActionTypes.SAVE_USER_PROFILE,
    payload: userProfile,
  };
}

function deleteUserProfile() {
  return { type: ActionTypes.DELETE_USER_PROFILE };
}

function saveUserDatabase<T>(userDatabase: T) {
  return { type: ActionTypes.SAVE_USER_DATABASE, payload: userDatabase };
}

function deleteUserDatabase() {
  return { type: ActionTypes.DELETE_USER_DATABASE };
}

function deleteAll() {
  return { type: ActionTypes.DELETE_ALL };
}

function saveAll<T>(data: T) {
  return {
    type: ActionTypes.SAVE_ALL,
    payload: data,
  };
}

export default {
  saveUserToken,
  saveUserProfile,
  saveUserDatabase,
  deleteUserToken,
  deleteUserProfile,
  deleteUserDatabase,
  deleteAll,
  saveAll,
};
