import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { ConstructorPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, FeedPage, IngredientPage, FeedDetailPage } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect, FC } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { FeedDetails } from '../../pages/feed-detail-page/feed-detail-page';
import { getIngredients } from '../../services/actions/index';
import { getUser } from '../../services/actions/user';
import AppHeader from '../../components/app-header/app-header';
import { API_URL } from '../../utils/api';
import { Location } from "history";

import { closeModalIngredient } from '../../services/actions/index';
import { useAppDispatch } from '../../services/hooks';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<Location>();
  const location = useLocation<{ background?: Location<{} | null | undefined> }>();
  const background = location.state && location.state.background;
  const ingredientAPI = `${API_URL}/api/ingredients/`;

  useEffect( () => {
    dispatch(getUser());
    dispatch(getIngredients(ingredientAPI));
  },[]);

  const modalClose = (type: string) => {
    dispatch(closeModalIngredient());
    if(type === 'ingredients') {
      history.push('/');
    } else if(type === 'feed') {
      history.push('/feed');
    } else if(type === 'profile-orders') {
      history.push('/profile/orders');
    } else {
      history.push('/');
    }
  }

  return (<>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact component={ConstructorPage} />
        <Route path="/feed" exact component={FeedPage} />
        <Route path="/feed/:id" exact component={FeedDetailPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/forgot-password" exact component={ForgotPasswordPage} />
        <Route path="/reset-password" exact component={ResetPasswordPage} />
        <Route path="/ingredients/:id" exact component={IngredientPage} />

        <ProtectedRoute path="/profile/orders" exact>
          <OrdersPage />
        </ProtectedRoute>

        <ProtectedRoute path="/profile/orders/:id" exact>
          <FeedDetailPage />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        
      </Switch>
      {background && <Route path='/ingredients/:id'>
        <Modal header="Детали ингредиента" modalClose={() => modalClose('ingredients')}>
          <IngredientDetails />
        </Modal> 
      </Route>}

      {background && <Route path='/feed/:id'>
        <Modal modalClose={() => modalClose('feed')}>
          <FeedDetails />
        </Modal> 
      </Route>}

      {background && <Route path='/profile/orders/:id'>
        <Modal modalClose={() => modalClose('profile-orders')}>
          <FeedDetails />
        </Modal> 
      </Route>}
      </>
  );
}

export default App;
