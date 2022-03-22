import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { FC } from 'react';
import { TProtectedRouteProps } from '../../services/types/protected-route-types';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({children,...rest}) => {
    const token: string | undefined = getCookie('refreshToken');
    return(
    <Route
      {...rest}
      render={({ location }) => (
            token ? children : <Redirect to={{
                pathname: '/login', 
                state: { 
                    from: location 
                    }
                }
            }
           />
        )
      }
    />);
}