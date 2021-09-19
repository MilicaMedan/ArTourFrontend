const INITIAL_STATE = {
    //clientsData:{ clientsLoading: true, addClientModalVisible: false},
    userData: {jwt: ''},
    userSettings: {settings: 0}
  };
  
  export const deleteUserCredentials = 'DELETE_USER_CREDENTIALS';
  export const changeUserCredentials = 'CHANGE_USER_CREDENTIALS';
  export const changeUserSettings = 'CHANGE_USER_SETTINGS';
  
  export const dataReducer = (state = INITIAL_STATE, action) => {
    
    switch (action.type) {

      case 'DELETE_USER_CREDENTIALS':
        newState = {...state};
        newState.userData = {...action.payload};
        return newState;
      case 'CHANGE_USER_CREDENTIALS':
        newState = {...state};
        newState.userData = {...action.payload};
        return newState;
      case 'CHANGE_USER_SETTINGS':
        newState = {...state};
        newState.userSettings = {...action.payload};
        return newState;
      default:
        return state
  }};