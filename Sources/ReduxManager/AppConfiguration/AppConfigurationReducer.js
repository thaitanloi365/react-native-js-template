// @flow

import { ActionTypes } from './AppConfigurationActionTypes';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import type { AppConfiguration } from 'Models';
import * as Actions from './AppConfigurationActions';

type State = {
  appConfiguration?: AppConfiguration,
};

const initialState: State = {};

const appConfigurationReducer = (
  state: State,
  action: {
    type: $Keys<typeof ActionTypes>,
    payload?: State,
  }
) => {
  switch (action.type) {
    case ActionTypes.SAVE_APP_CONFIGURATION:
      return { ...state, appConfiguration: action.payload };
    case ActionTypes.DELETE_APP_CONFIGURATION:
      return { ...state, appConfiguration: null };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'appConfiguration',
  storage: AsyncStorage,
  whitelist: ['appConfiguration'],
};

//$FlowFixMe
const reducer = persistReducer(persistConfig, appConfigurationReducer);

export default { initialState, reducer };
