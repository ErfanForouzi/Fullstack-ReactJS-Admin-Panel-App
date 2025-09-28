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
export function setPersonLoading(payload) {
    return { type: "PERSON_LOADING", payload };
  }

export function getPeople() {
  return async (dispatch) => {
    dispatch(setPeopleLoading(true));
    const response = await request({ url: "/users" });
    if (response?.status === 200) {
      dispatch(setPeople(response?.data));
    } else {
      dispatch(setPeople([]));
    }
    dispatch(setPeopleLoading(false));
  };
}


  export function getPerson(id) {
    return async (dispatch) => {
        dispatch(setPersonLoading(true))
        const response = await request({ url: `/users/${id}` });
        if (response?.status === 200) {
             dispatch(setPerson(response?.data));
        } else {
             dispatch(setPerson({}));
        }
        dispatch(setPersonLoading(false))
    };
  }
  export function updatePerson(data){
    return async(dispatch)=>{
        
        const response = await request({
            url: `/users/${id}`,
            method: "put",
            data,
          });
          if (response.status === 200) {
            navigate(`/people/${id}`);
            CustomNotification({
              type: "success",
              message: "کاربر با موفقیت ویرایش شد",
              style: {
                fontFamily: "vazirmatn",
              },
            });
          }
    }
  }
  export function removePersonAsyncAction(id){
    return async(dispatch)=>{
        dispatch(removePersonLoading(true))
        const response  =  await request({ url: `/users/${id}`,method:"delete" });
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