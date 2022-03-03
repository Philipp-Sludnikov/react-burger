import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = ({children,...rest}) => {
    const token = getCookie('refreshToken');
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