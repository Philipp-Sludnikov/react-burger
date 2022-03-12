import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

const IngredientPage = () => {
  return(
    <section className={styles.ingredientWrapper}>
      <p className={`text text_type_main-large ${styles.wrapperTitle}`}>Детали ингредиента</p>
      <IngredientDetails />
    </section>);  
}

export default IngredientPage;