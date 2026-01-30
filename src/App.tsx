import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Layout from './components/Layout/Layout';
import SportCard from './components/Cards/SportCard';
import { SPORT_CONFIGS } from './config/sports';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          {SPORT_CONFIGS.map((config) => (
            <SportCard key={config.type} config={config} />
          ))}
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default App;
