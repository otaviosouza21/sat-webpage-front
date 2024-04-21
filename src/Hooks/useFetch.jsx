import React, { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const request = useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      setData(json)
      if (response.ok === false) throw new Error(json.mensagem);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setTimeout(()=>{
        setLoading(false);
      },1000)
      return { response, json };
    }
  }, []);
  return {
    data,
    loading,
    error,
    request,
    setLoading
  };
};

export default useFetch;