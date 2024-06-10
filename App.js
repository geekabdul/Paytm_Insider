import React from 'react';

import {Provider} from 'react-redux';
import RouteScreen from './src/route/RouteScreen';
import {store} from './src/ReduxToolkit/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RouteScreen />
    </Provider>
  );
};

export default App;
