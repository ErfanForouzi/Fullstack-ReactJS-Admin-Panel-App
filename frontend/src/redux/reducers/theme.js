export function theme(state = { mode: "dark" }, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}
