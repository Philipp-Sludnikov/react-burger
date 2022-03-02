import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, FeedPage, IngredientPage } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getCookie } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from '../../services/actions/auth';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/index';

import { closeModalIngredient } from '../../services/actions/index';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;
  const ingredientAPI = 'https://norma.nomoreparties.space/api/ingredients/';

  useEffect( () => {
    const token = getCookie('token');
    dispatch(getIngredients(ingredientAPI));
    if(token) dispatch(refreshToken(token));
  },[]);

  const modalClose = () => {
    dispatch(closeModalIngredient());
    history.push('/');
  }

  return (<>
      <Switch location={background || location}>
        <Route path="/" exact component={ConstructorPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/forgot-password" exact component={ForgotPasswordPage} />
        <Route path="/reset-password" exact component={ResetPasswordPage} />
        <Route path="/ingredients/:id" exact component={IngredientPage} />

        <ProtectedRoute path="/profile/orders" exact>
          <OrdersPage />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        
      </Switch>
      {background && <Route path='/ingredients/:id'>
        <Modal header="Детали ингредиента" modalClose={modalClose}>
          <IngredientDetails />
        </Modal> 
      </Route>
      }
      </>
  );
}

export default App;
