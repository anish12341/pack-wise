import React from 'react';

const appContext = React.createContext({
  imageBlob: undefined,
  updateImageBlob: () => {},
  response: {}
});

export default appContext;