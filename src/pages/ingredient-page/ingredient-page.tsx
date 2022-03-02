import AppHeader from '../../components/app-header/app-header';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

const IngredientPage = () => {
  return (<>
    <AppHeader />
    <section className={styles.ingredientWrapper}>
      <p className={`text text_type_main-large ${styles.wrapperTitle}`}>Детали ингредиента</p>
      <IngredientDetails />
    </section>
  </>);  
}

export default IngredientPage;