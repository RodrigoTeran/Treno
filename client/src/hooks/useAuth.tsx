import { Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../App';

// Routes
import { fetcher, RESPONSE } from '../utils/fetcher';
import { getUser, GET_USER_DATA } from '../routes/auth.routes';
import { USER } from '../types/user.types';

// Config
import { protectedRoutes, authRestrictedRoutes } from '../config/routes';

interface Params {
    setUser: Dispatch<SetStateAction<USER | null>> | undefined;
    setIsAuth: Dispatch<SetStateAction<boolean>> | undefined;
}

export type REFETCH_USER = (callback?: (res: RESPONSE) => any) => Promise<void>;

type USE_AUTH = ({ setUser, setIsAuth }: Params) => REFETCH_USER;

export const useAuth: USE_AUTH = ({ setUser, setIsAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsLoadingGetUser } = useContext(AppContext);

    const fetchUser = async (
        callback?: (res: RESPONSE) => any
    ): Promise<void> => {
        try {
            if (setIsLoadingGetUser != null) setIsLoadingGetUser(true);
            const response: RESPONSE = await fetcher[getUser.method]({
                uri: getUser.url,
            });
            if (setIsLoadingGetUser != null) setIsLoadingGetUser(false);

            redirectInCaseOfProtectedRoute(response.data.isAuth);
            if (setIsAuth != null) setIsAuth(response.data.isAuth);

            if (response.data.isAuth) {
                // Assuming is the right data
                const userData: GET_USER_DATA = response.data.data;

                if (setUser != null)
                    setUser({
                        id: userData.id,
                        name: userData.name
                    });
            }

            if (callback != null) callback(response);
            return;
        } catch {
            if (setIsLoadingGetUser != null) setIsLoadingGetUser(false);
            if (location.pathname === '/') return;

            navigate('/');
        }
    };

    const redirectInCaseOfProtectedRoute = (isAuth: boolean): void => {
        if (!isAuth) {
            // Redirect in case of no Auth
            for (let i = 0; i < protectedRoutes.length; i++) {
                // if (router.pathname.includes(protectedRoutes[i])) {
                if (!location.pathname.includes(protectedRoutes[i])) continue;

                // Redirect to home if no AUTH
                navigate('/');
                return;
            }
            return;
        }

        // Redirect in case of Auth
        for (let i = 0; i < authRestrictedRoutes.length; i++) {
            // if (router.pathname.includes(protectedRoutes[i])) {
            if (!location.pathname.includes(authRestrictedRoutes[i])) continue;

            // Redirect to dashboard because it has AUTH
            navigate('/aplicacion');
            return;
        }
    };

    return fetchUser;
};
