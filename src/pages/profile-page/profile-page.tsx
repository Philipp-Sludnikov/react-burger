import AppHeader from '../../components/app-header/app-header';
import styles from './profile-page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../services/actions/logout';
import { getUser, updateUser } from '../../services/actions/user';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';

export const ProfileNavigation = () => {
    const dispatch = useDispatch();
    const token = getCookie('token');

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logoutUser(token));
    }

    return(
        <nav className={styles.profileNavWrapper}>
            <ul className='mb-20'>
                <li><NavLink exact to='/profile' className={`text text_type_main-medium text_color_inactive pt-3 pb-3 ${styles.navigationLink}`} activeClassName={styles.activeLink}>Профиль</NavLink></li>
                <li><NavLink exact to='/profile/orders' className={`text text_type_main-medium text_color_inactive pt-3 pb-3 ${styles.navigationLink}`} activeClassName={styles.activeLink}>История заказов</NavLink></li>
                <li><NavLink exact to='/logout' className={`text text_type_main-medium text_color_inactive pt-3 pb-3 ${styles.navigationLink}`} activeClassName={styles.activeLink} onClick={logoutHandler}>Выход</NavLink></li>
            </ul>
            <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
    );
}

const EditProfileForm = () => {
    const dispatch = useDispatch();
    const { user, auth } = useSelector((store: RootStateOrAny) => store);
    const [formValues, setFormValues] = useState({name: user.name, email: user.email, password: 'password'});
    const [isEdit, setIsEdit] = useState(false);
    const [editElements, setEditElements] = useState({});

    

    useEffect(() => {
        if(typeof auth.accessToken !== 'undefined') {
            dispatch(getUser(auth.accessToken));
        }
    }, [auth.accessToken, user.name, user.email])

    useEffect(() => {
        setFormValues({name: user.name, email: user.email, password: 'password'});
    }, [user.name, user.email])

    const editHandler = (e) => {
        e.preventDefault();
        setIsEdit(true);
        setFormValues({...formValues, [e.target.name]: e.target.value});
        setEditElements({...editElements, [e.target.name]:e.target.value});
        
        
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        setFormValues({name: user.name, email: user.email, password: 'password'});
        setEditElements({});
        setIsEdit(false);
    }
    
    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser(auth.accessToken, editElements));
        setEditElements({});
        setIsEdit(false);
    }

    const onFocusPassHandler = (e) => {
        setFormValues({...formValues, password: ''});
    }

    const onBlurPassHandler = (e) => {
        if(formValues.password == '') {
            setFormValues({...formValues, password: 'password'});
        }
    }

    return(
        <section className={styles.profileFormWrapper}>
            <form className={`${styles.profileForm} mb-20`} onSubmit={formSubmitHandler}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={formValues.name}
                    icon={'EditIcon'}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    onChange={editHandler}
                />
                <Input
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={editHandler}
                    value={formValues.email}
                    icon={'EditIcon'}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={editHandler}
                    value={formValues.password}
                    icon={'EditIcon'}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    onFocus={onFocusPassHandler}
                    onBlur={onBlurPassHandler}
                />
                {(isEdit || (!user.updateUserRequest && user.updateUserFailed)) &&
                <section className={styles.profileButtons}>
                    <Button type="primary" size="medium" onClick={cancelHandler}>Отмена</Button>
                    <Button type="primary" size="medium">Сохранить</Button>
                </section>
                }
            </form>
        </section>
    );
}



const ProfilePage= () => {

    return (<>
        <AppHeader />
        <section className={styles.profileWrapper}>
            <ProfileNavigation />
            <EditProfileForm />
        </section>
    </>);  
}

export default ProfilePage;