import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import AnimatedRoutes from './components/Routes/AnimatedRoutes';

// Types
import { USER } from './types/user.types';

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
          <AnimatedRoutes />
        </BrowserRouter>
      </AppContext.Provider>
    </HelmetProvider>
  );
};

export default App;
