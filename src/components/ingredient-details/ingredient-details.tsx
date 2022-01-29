import styles from './ingredient-details.module.css';
import {IngredientPropTypes} from '../../utils/types';

const IngredientDetails = (props) => {
    return(
        <section className='mb-5'>
          <img src={props.image_large} alt={props.name} className='mb-4' />
          <p className="text text_type_main-medium mb-8">{props.name} </p>
          <section className={styles.composition}>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Калории,ккал</p>
              <p className='text text_type_digits-default text_color_inactive'>{props.calories}</p>
            </span>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Белки, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{props.proteins}</p>
            </span>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Жиры, г</p>
              <p className={'text text_type_digits-default text_color_inactive ' + styles.compositionItemValue}>{props.fat}</p>
            </span>
            <span>
              <p className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Углеводы, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{props.carbohydrates}</p>
            </span>
          </section>
        </section>
      );
}

IngredientDetails.propTypes = IngredientPropTypes;

export default IngredientDetails;