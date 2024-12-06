import ReactGA from 'react-ga4';

export const logButtonClick = (buttonName) => {
    ReactGA.event({
      category: 'Botões',
      action: 'Clique',
      label: buttonName,
    });
  };