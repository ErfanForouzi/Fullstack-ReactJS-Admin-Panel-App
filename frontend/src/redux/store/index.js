import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import reducer from "../reducers";



// function middleware({dispatch,getState}) {
//     return function (next) {
//         return function(action){
//             if(typeof action ==='function'){
//                 return action(dispatch,getState)
//             }else{
//                 return next(action)
//             }
//         }
//      }
//  }

const store = createStore(reducer, applyMiddleware(thunk));


export default store;
