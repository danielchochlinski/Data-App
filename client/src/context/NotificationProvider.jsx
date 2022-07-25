import React, { createContext, useContext, useReducer,  } from "react";
import Notification from "../context/NotificationProvider";

import "./NotificationProvider.css";

const init = {};
const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADD_NOTIFICATION":
          return [...state, { ...action.payload }];
        case "REMOVE_NOTIFICATION":
          return state.filter((el) => el.id !== action.id);
        default:
          return state;
      }
    },
    [{ id: "1", type: "SUCCESS", message: "sucess", title: "Successful Request" }]
  );

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={"notification_wrapper"}>
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);
  const uniqueID = () => {
    const uniq = "id" + new Date().getTime();
    return uniq;
  };
  return (props) => {
    dispatch({
      id: uniqueID(),
      type: "ADD_NOTIFICATION",
      payload: {
        ...props,
      },
    });
  };
};
