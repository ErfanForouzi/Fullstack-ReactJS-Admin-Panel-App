import { request } from "@/tools/request";

export function setPeople(payload) {
  return { type: "PEOPLE", payload };
}
export function setPeopleLoading(payload) {
  return { type: "PEOPLE_LOADING", payload };
}
export function setPerson(payload) {
  return { type: "PERSON", payload };
}
export function removePerson(payload) {
  return { type: "REMOVE_PERSON", payload };
}
export function removePersonLoading(payload) {
  return { type: "REMOVE_PERSON_LOADING", payload };
}
export function editPerson(payload) {
  return { type: "EDIT_PERSON", payload };
}
export function editPersonLoading(payload) {
  return { type: "EDIT_PERSON_LOADING", payload };
}
export function addPerson(payload) {
  return { type: "ADD_PERSON", payload };
}
export function addPersonLoading(payload) {
  return { type: "ADD_PERSON_LOADING", payload };
}
export function setPersonLoading(payload) {
    return { type: "PERSON_LOADING", payload };
  }

export function getPeople() {
  return async (dispatch) => {
    dispatch(setPeopleLoading(true));
    const response = await request({ url: "/api/users" });
    if (response?.status === 200) {
      dispatch(setPeople(response?.data?.users));
    } else {
      dispatch(setPeople([]));
    }
    dispatch(setPeopleLoading(false));
  };
}


  export function getPerson(id) {
    return async (dispatch) => {
        dispatch(setPersonLoading(true))
        const response = await request({ url: `/api/users/${id}` });
        if (response?.status === 200) {
             dispatch(setPerson(response?.data?.user));
        } else {
             dispatch(setPerson({}));
        }
        dispatch(setPersonLoading(false))
    };
  }
  export function updatePerson({id,data}){
    return async(dispatch)=>{
      dispatch(editPersonLoading(true))
        const response = await request({
            url: `/api/users/${id}`,
            method: "put",
            data,
          })
          if (response) {
            dispatch(editPerson({id,data}));
            dispatch(editPersonLoading(false))
            return true
          }else{
            dispatch(editPersonLoading(false))
            return false
          }
    }
  }
  export function createPerson(data){
    return async(dispatch)=>{
      dispatch(addPersonLoading(true))
        const response = await request({
            url: `/api/register`,
            method: "post",
            data,
          })
          if (response) {
            dispatch(addPerson(data));
            dispatch(addPersonLoading(false))
            return true
          }else{
            dispatch(addPersonLoading(false))
            return false
          }
    }
  }
  export function removePersonAsyncAction(id){
    return async(dispatch)=>{
        dispatch(removePersonLoading(true))
        const response  =  await request({ url: `/api/users/${id}`,method:"delete" });
        if(response && response.status === 200){
            dispatch(removePerson(id));
            dispatch(removePersonLoading(false))
            return true
        }else{
            dispatch(removePersonLoading(false))
            return false
            
        }
    }
  }