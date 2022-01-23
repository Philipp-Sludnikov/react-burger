import styles from './app.module.css';
import AppHeader from '..//app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div>
      <AppHeader />
      <main className={styles.mainWrapper}>
        <h2 className={"text text_type_main-large mb-5 " + styles.mainTitle}>Соберите бургер</h2>
        <section className={styles.wrapperPart}>
          <BurgerIngredients />
        </section>
        <section className={'pl-4 ' + styles.wrapperPart}>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
