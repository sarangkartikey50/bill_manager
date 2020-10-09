import React, { lazy, Suspense } from 'react';

const Header = lazy(() => import('components/Header'));
const BillsManager = lazy(() => import('containers/BillsManager'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={'loading...'}>
        <Header />
        <BillsManager />
      </Suspense>
    </div>
  );
}

export default App;
 