export function theme(state = { mode: "dark" }, action) {
  console.log(action.type, state);
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}
