import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './GlobalProvider';
import GlobalStateToggles from './GlobalStateToggles';
import App from './App';

const root = createRoot(document.getElementById('root'));

const AppWrapper = () => {
  return (
    <BrowserRouter>
      {/* @ts-ignore */}
      <GlobalProvider>
        <div>
          <App />
          <GlobalStateToggles />
        </div>
      </GlobalProvider>
    </BrowserRouter>
  );
};

root.render(<AppWrapper />);
