import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";

// Types
import { USER } from './types/user.types';

// Pages
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn/LogIn';
import Dashboard from './pages/Dashboard/Dashboard';

// Layout
import Layout from './components/Layout/Layout';

// Auth
import Auth from './components/Auth/Auth';

// Context
export const AppContext = createContext<Partial<AppValueProvider>>({});

interface AppValueProvider {
  user: USER | null;
  setUser: Dispatch<SetStateAction<USER | null>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;

  isLoadingGetUser: boolean;
  setIsLoadingGetUser: Dispatch<SetStateAction<boolean>>;
}

const App: React.FunctionComponent = (): JSX.Element => {
  const [user, setUser] = useState<USER | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoadingGetUser, setIsLoadingGetUser] = useState<boolean>(true);

  return (
    <HelmetProvider>
      <AppContext.Provider
        value={{
          user,
          setUser,
          isAuth,
          setIsAuth,

          isLoadingGetUser,
          setIsLoadingGetUser,
        }}
      >
        <BrowserRouter>
          <Auth />
          <Routes>
            <Route path="/" element={<Layout isDashboard={false} />}>
              <Route index element={<Home />} />
              <Route path="iniciar-sesion" element={<LogIn />} />
            </Route>
            <Route path="aplicacion" element={<Layout isDashboard />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </HelmetProvider>
  );
};

export default App;
