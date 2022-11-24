import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';

// Hooks
import { useAuth } from '../../hooks/useAuth';

const CardLogIn: React.FunctionComponent = (): JSX.Element => {
    const { setUser, setIsAuth } = useContext(AppContext);

    const fetchUser = useAuth({
        setUser,
        setIsAuth,
    });

    useEffect(() => {
        const initialize = async (): Promise<void> => {
            await fetchUser();
        };
        void initialize();
    // eslint-disable-next-line
    }, []);

    return <></>;
};

export default CardLogIn;
