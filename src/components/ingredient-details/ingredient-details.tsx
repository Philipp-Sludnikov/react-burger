import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { setViewedIngredient } from '../../services/actions/index';
import { TIngredientDetailsParams } from '../../services/types/ingredient-details-types';
import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const IngredientDetails: FC = () => {
    const params: TIngredientDetailsParams = useParams();
    const dispatch = useAppDispatch();
    const currentViewedIngredient = useAppSelector(store => store.modalIngredient.currentViewedIngredient);
    const ingredients = useAppSelector(store => store.ingredients.ingredients);
    
  
    useEffect( () => {
      if(Object.keys(currentViewedIngredient).length === 0 && ingredients.length !== 0) {
        const ingredient = ingredients.filter((el) => el._id === params.id);
        dispatch(setViewedIngredient(ingredient[0]));
      }
        
    }, [ingredients, currentViewedIngredient]);

      return(
        <section className={`mb-5 ${styles.viewedIngredient}`}>
          <img src={currentViewedIngredient.image_large} alt={currentViewedIngredient.name} className='mb-4' />
          <p className='text text_type_main-medium mb-8'>{currentViewedIngredient.name}</p>
          <section className={styles.composition}>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Калории,ккал</p>
              <p className='text text_type_digits-default text_color_inactive'>{currentViewedIngredient.calories}</p>
            </span>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Белки, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{currentViewedIngredient.proteins}</p>
            </span>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Жиры, г</p>
              <p className={'text text_type_digits-default text_color_inactive ' + styles.compositionItemValue}>{currentViewedIngredient.fat}</p>
            </span>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Углеводы, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{currentViewedIngredient.carbohydrates}</p>
            </span>
          </section>
        </section>
      );
  }

export default IngredientDetails;