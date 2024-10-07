import React from "react";
import axios from "axios";

const usePolling = () => {
  const [isPolling, setIsPolling] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<any>(null);
  function resetSuccess() {
    setSuccess(false);
  }

  function resetResponse() {
    setResponse(null);
  }

  // can poll this url to see if the task is done.
  function polling(id: string): void {
    setError(false);
    fetch("http://localhost:5000/result/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsPolling(true);
        if (data.task_status === "SUCCESS") {
          setIsPolling(false);
          setSuccess(true);
          setResponse(data.task_result);
        } else if (data.task_status === "PENDING" || data.task_status === "STARTED") {
          setTimeout(() => polling(data.task_id), 1000);
        }
      })
      .catch((error) => {
        setIsPolling(false);
        setError(true);
        console.error(error);
      });
  }

  // can call this function to call the API to start the celery task.
  const callAPI = (url: string, methodString: string, data: any) => {
    setError(false);
    setResponse(null);
    fetch(url, {
      method: methodString,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data: { id: string }) => {
        polling(data.id);
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });
  };

  return {
    isPolling,
    success,
    error,
    response,
    resetResponse,
    callAPI,
    resetSuccess,
  };
};

export default usePolling;
