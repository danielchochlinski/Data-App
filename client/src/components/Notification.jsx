import React, { useCallback, useState, useEffect } from "react";
import "./Notification.css";

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState();

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalID(id);
  };

  const handlePauseTimer = useCallback(() => {
    clearInterval();
  }, [intervalID]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
        payload: {
          id: "",
          type: "",
          message: "",
          title: "",
        },
      });
    }, 400);
  }, [handlePauseTimer, props]);

  useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification();
    }
  }, [handleCloseNotification, width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification_item ${props.type === "SUCCESS" ? "success" : "error"} ${exit ? "exit" : ""}`}
    >
      <p>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
