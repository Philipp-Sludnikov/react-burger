import { Route, Redirect, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { FC } from 'react';

export const ProtectedRoute: FC<RouteProps> = ({children,...rest}) => {
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