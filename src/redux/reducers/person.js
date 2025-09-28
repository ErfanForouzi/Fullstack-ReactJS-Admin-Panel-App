export function people(state = [], action) {
  switch (action.type) {
    case "PEOPLE":
      return action.payload;
    case "REMOVE_PERSON":
      return state.filter((p) => p.id !== action.payload);

    default:
      return state;
  }
}

export function peopleLoading(state = false, action) {
  switch (action.type) {
    case "PEOPLE_LOADING":
      return action.payload;
    default:
      return state;
  }
}

export function person(state = {}, action) {
  switch (action.type) {
    case "PERSON":
      return action.payload;
    default:
      return state;
  }
}
export function personLoading(state = false, action) {
  switch (action.type) {
    case "PERSON_LOADING":
      return action.payload;
    default:
      return state;
  }
}
export function removePersonLoading(state = false, action) {
  switch (action.type) {
    case "REMOVE_PERSON_LOADING":
      return action.payload;
    default:
      return state;
  }
}
