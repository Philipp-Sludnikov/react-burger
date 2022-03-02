import { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientPropTypes } from '../../utils/types';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { showModalIngredient } from '../../services/actions/index';
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';

const IngredientsTabs = ({ currentTab }) => {
    const [current, setCurrent] = useState(currentTab);
    return (
        <div className={'mb-10 ' + styles.ingredientTabs}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrent}>Булки</Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrent}>Соусы</Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={setCurrent}>Начинки</Tab>
        </div>
    )
};

const IngredientItem = ({ingredient}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const constructorItems = useSelector((store: RootStateOrAny) => store.constructorIngredients.constructorIngredients);
    const countItem = useMemo(() => constructorItems.filter(element => ingredient._id === element._id).length, [constructorItems]);
    

    const [{canDrag, isIngredeintDrag}, dragIngredientRef] = useDrag({
        type: "ingredient",
        item: {...ingredient},
        canDrag: () => canDragIngredient({...ingredient}),
        collect: monitor => ({
            isIngredeintDrag: monitor.isDragging(),
            canDrag: monitor.canDrag()
        })
    });

    const canDragIngredient = (item) => {
        const itemsCount = constructorItems.length;
        if(itemsCount === 0) {
            if(item.type === 'bun') {
                return true;
            } else {
                return false;
            }
        } else {
            const bunIndex = constructorItems.findIndex(element => element.type === 'bun' && element._id === item._id);
            if(bunIndex === -1) {
                return true;
            } else {
                return false;
            }
        }
 
    }

    const openModal = (ingredient) => {
        dispatch(showModalIngredient(ingredient));
        history.push(`/ingredients/${ingredient._id}`, {background: location});
        console.log(history);
        
    }

    return (
        <li className={`mb-8 pl-4 pr-4 ${styles.ingredientListItem} ${isIngredeintDrag && styles.dragIngredientListItem} ${!canDrag && styles.ingredientListItemNotCanDrag}`} onClick={() => openModal(ingredient)} ref={dragIngredientRef}>
            {countItem !== 0 && <Counter count={countItem} size="default" />}
            <img src={ingredient.image} alt={ingredient.name} className={'mb-1 ' + styles.ingredientImage} />
            <section className={'text text_type_digits-default mb-1 ' + styles.ingredientItemPrice}><span className='mr-2'>{ingredient.price}</span> <CurrencyIcon type="primary" /></section>
            <section className={styles.ingredientItemTitle}><p className='text text_type_main-default'>{ingredient.name}</p></section>
            <section className={'mt-4 text text_type_main-small ' + styles.addIngredentBtn}>Добавить</section>
        </li>
    )
};

const BurgerIngredientsList = (props) => {
    return (
        <>
            <h3 className={'text text_type_main-medium ' + styles.sectionName}>{props.heading}</h3>
            <ul className={'pt-6 pl-4 pr-2 pb-2 ' + styles.listOfIngredients}>
            {props.ingredients.map(ingredient => ingredient.type === props.type && (
                <IngredientItem ingredient={ingredient} key={ingredient._id} />
            ))}
            </ul>
        </>
    )
};

const BurgerIngredients = () => {

    const { ingredients } = useSelector((store: RootStateOrAny) => store.ingredients);

    const [currentTab, setCurrentTab] = useState('bun');

    const handleIngredientsListScroll = (e) => { 
        const ingredientsWrapper = e.target;
        const ingredientsWrapperPos = ingredientsWrapper.getBoundingClientRect().top;
        const elements = ingredientsWrapper.getElementsByTagName('h3');
        
        const elementsArr = [...elements];
        let current_diff = Math.abs(elementsArr[0].getBoundingClientRect().top - ingredientsWrapperPos);
        let currentTabName = elementsArr[0].innerHTML;

        elementsArr.map(function(elem) {
            if(Math.abs((elem.getBoundingClientRect().top - ingredientsWrapperPos)) < current_diff) {
                current_diff = Math.abs(elem.getBoundingClientRect().top - ingredientsWrapperPos);
                currentTabName = elem.innerHTML;
            }
            
        });

        if(currentTabName === 'Булки') {
            setCurrentTab('bun');
        } else if(currentTabName === 'Соусы') {
            setCurrentTab('sauce');
        } else if(currentTabName === 'Начинки') {
            setCurrentTab('main');
        }
    }

    return(
        <>
            <IngredientsTabs currentTab={currentTab}/>
            <section className={styles.ingredientsListWrapper} onScroll={(e) => handleIngredientsListScroll(e)}>
                <BurgerIngredientsList ingredients={ingredients} heading="Булки" type="bun"/>
                <BurgerIngredientsList ingredients={ingredients} heading="Соусы" type="sauce"/>
                <BurgerIngredientsList ingredients={ingredients} heading="Начинки" type="main"/>
            </section>
        </>
    );
}

IngredientItem.propTypes = {
    ingredient: PropTypes.shape(IngredientPropTypes).isRequired,
}; 

BurgerIngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientPropTypes)).isRequired,
    heading: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}; 

export default BurgerIngredients;