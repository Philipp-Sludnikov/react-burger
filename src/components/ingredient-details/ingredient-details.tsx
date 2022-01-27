import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
    return(
        <section className='mb-5'>
          <img src={props.image_large} alt={props.name} className='mb-4' />
          <section className="text text_type_main-medium mb-8">{props.name} </section>
          <section className={styles.composition}>
            <section>
              <section className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Калории,ккал</section>
              <section className='text text_type_digits-default text_color_inactive'>{props.calories}</section>
            </section>
            <section>
              <section className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Белки, г</section>
              <section className='text text_type_digits-default text_color_inactive'>{props.proteins}</section>
            </section>
            <section>
              <section className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Жиры, г</section>
              <section className={'text text_type_digits-default text_color_inactive ' + styles.compositionItemValue}>{props.fat}</section>
            </section>
            <section>
              <section className={'text text_type_main-default text_color_inactive ' + styles.compositionItemName}>Углеводы, г</section>
              <section className='text text_type_digits-default text_color_inactive'>{props.carbohydrates}</section>
            </section>
          </section>
        </section>
      );
}

IngredientDetails.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number
};

export default IngredientDetails;