const INITIAL_STATE = {
    //clientsData:{ clientsLoading: true, addClientModalVisible: false},
    userData: {jwt: ''}
  };
  
  //export const changeClientLoadingState = 'CHANGE_CLIENT_LOADING_STATE';
 // export const changeAddClientModalVisibility = 'CHANGE_ADD_CLIENT_MODAL_VISIBILITY';
  export const changeUserCredentials = 'CHANGE_USER_CREDENTIALS';
  
  export const dataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
     /* case 'CHANGE_CLIENT_LOADING_STATE':
        newState = {...state};
        newState.clientsData.clientsLoading = action.payload;
        return newState;
      case 'CHANGE_ADD_CLIENT_MODAL_VISIBILITY':
        newState = {...state};
        newState.clientsData.addClientModalVisible = action.payload;
        return newState;
        */
      case 'CHANGE_USER_CREDENTIALS':
        newState = {...state};
        newState.userData = {...action.payload};
        return newState;
      default:
        return state
  }};