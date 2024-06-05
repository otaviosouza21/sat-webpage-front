import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default PageTracker;
