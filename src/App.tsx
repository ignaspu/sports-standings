import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { footballSlice, basketballSlice, tennisSlice } from './store/store';
import { store, persistor } from './store/store';
import Layout from './components/Layout/Layout';
import SportCard from './components/SportCard/SportCard';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <SportCard
            title="Premier League"
            type="football"
            theme="minimal"
            slice={footballSlice}
          />
          <SportCard
            title="EUROBASKET"
            type="basketball"
            theme="energetic"
            slice={basketballSlice}
          />
          <SportCard
            title="Wimbledon"
            type="tennis"
            theme="centric"
            slice={tennisSlice}
          />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default App;
