
  export function user(state = {}, action) {
    switch (action.type) {
      case "USER":
        return action.payload;
      default:
        return state;
    }
  }
  export function userLoading(state = true, action) {
    switch (action.type) {
      case "USER_LOADING":
        return action.payload;
      default:
        return state;
    }
  }
  export function userIsLogging(state = false, action) {
    switch (action.type) {
      case "USER_ISLOGGING":
        return action.payload;
      default:
        return state;
    }
  }
