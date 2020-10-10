import React, { lazy, Suspense } from 'react';
import Loader from 'shared/Loader';
import styles from 'styles/app.module.scss';

const Header = lazy(() => import('components/Header'));
const BillsManager = lazy(() => import('containers/BillsManager'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader className={styles.suspenseFallback} />}>
        <Header />
        <BillsManager />
      </Suspense>
    </div>
  );
}

export default App;
 