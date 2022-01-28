import React from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {IngredientPropTypes} from '../../utils/types';

function IngredientsTabs() {
    const [current, setCurrent] = React.useState('bun')
    return (
        <div className={'mb-10 ' + styles.ingredientTabs}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
        </div>
    )
};

function IngredientItem({ingredient, openModal}) {
    return (
        <li className={'mb-8 pl-4 pr-4 ' + styles.ingredientListItem} onClick={() => openModal(ingredient)}>
            <Counter count={1} size="default" />
            <img src={ingredient.image} alt={ingredient.name} className={'mb-1 ' + styles.ingredientImage} />
            <section className={'text text_type_digits-default mb-1 ' + styles.ingredientItemPrice}><span className='mr-2'>{ingredient.price}</span> <CurrencyIcon type="primary" /></section>
            <section className={styles.ingredientItemTitle}><p className='text text_type_main-default'>{ingredient.name}</p></section>
            <section className={'mt-4 text text_type_main-small ' + styles.addIngredentBtn}>Добавить</section>
        </li>
    )
};

function BurgerIngredientsList(props) {
    return (
        <>
            <h3 className={'text text_type_main-medium ' + styles.sectionName}>{props.heading}</h3>
            <ul className={'pt-6 pl-4 pr-2 pb-2 ' + styles.listOfIngredients}>
            {props.ingredients.map(ingredient => ingredient.type === props.type && (
                <IngredientItem ingredient={ingredient} key={ingredient._id} openModal={props.openModal} />
            ))}
            </ul>
        </>
    )
};

const BurgerIngredients = ({ingredients, openModal}) => { 
    return(
        <>
            <IngredientsTabs />
            <section className={styles.ingredientsListWrapper}>
                <BurgerIngredientsList ingredients={ingredients} openModal={openModal} heading="Булки" type="bun"/>
                <BurgerIngredientsList ingredients={ingredients} openModal={openModal} heading="Соусы" type="sauce"/>
                <BurgerIngredientsList ingredients={ingredients} openModal={openModal} heading="Начинки" type="main"/>
            </section>
        </>
    );
}

IngredientItem.propTypes = {
    ingredient: PropTypes.shape(IngredientPropTypes).isRequired,
    openModal: PropTypes.func.isRequired
}; 

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropTypes)).isRequired,
    openModal: PropTypes.func.isRequired
}; 

BurgerIngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropTypes)).isRequired,
    heading: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
}; 

export default BurgerIngredients;