import ReactGA from 'react-ga4'
 
export const iniciaAnalytics = () =>{
    ReactGA.initialize('G-L6LDB78164')
}
 
export const logPageView = () => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  };