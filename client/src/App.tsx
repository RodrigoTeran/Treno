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
import { MESSAGE } from './types/messages.types';
import { DEVICE } from "./types/devices.types";

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

  messages: Array<MESSAGE>
  setMessages: Dispatch<SetStateAction<Array<MESSAGE>>>

  isModalLink: boolean;
  setIsModalLink: Dispatch<SetStateAction<boolean>>;
  isModalDevice: boolean;
  setIsModalDevice: Dispatch<SetStateAction<boolean>>;

  selectedDevice: DEVICE | null;
  setSelectedDevice: Dispatch<SetStateAction<DEVICE | null>>
}

const App: React.FunctionComponent = (): JSX.Element => {
  const [user, setUser] = useState<USER | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoadingGetUser, setIsLoadingGetUser] = useState<boolean>(true);

  // Messages
  const [messages, setMessages] = useState<Array<MESSAGE>>([]);

  // State modal
  const [selectedDevice, setSelectedDevice] = useState<DEVICE | null>(null);


  // Modals
  const [isModalLink, setIsModalLink] = useState<boolean>(false);
  const [isModalDevice, setIsModalDevice] = useState<boolean>(false);


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

          messages,
          setMessages,

          isModalLink,
          setIsModalLink,
          isModalDevice,
          setIsModalDevice,

          selectedDevice,
          setSelectedDevice
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
