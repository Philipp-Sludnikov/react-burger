import styles from './login-page.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { loginUser, unsetLogout } from '../../services/actions/login';
import { Redirect, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const dispatch = useDispatch();

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(emailValue, passwordValue));
    }
    

    return(
        
        <section className={styles.loginFormWrapper}>
            <p className={`text text_type_main-medium mb-6 ${styles.signInTitle}`}>Вход</p>
            <form className={`${styles.loginForm} mb-20`} onSubmit={loginHandler}>
                <Input
                    type={'email'}
                    placeholder={'E-Mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                />
                <PasswordInput onChange={e => setPasswordValue(e.target.value)} value={passwordValue} name={'password'} />
                <Button type="primary" size="medium" >Войти</Button>
            </form>

            <p className='mb-4 text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to="/register" className={`text text_type_main-default ${styles.formLink}`}>Зарегистрироваться</Link></p>
            <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to="/forgot-password" className={`text text_type_main-default ${styles.formLink}`}>Восстановить пароль</Link></p>
        </section> 
    );
}

const LoginPage = () => {
    const isAuth = useSelector((store: RootStateOrAny) => store.auth.isAuth);
    const { state } = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(unsetLogout());
    });

    if(!isAuth) {
        return (
            <section className={styles.loginWrapper}>
                <LoginForm />
            </section>
        )
    } else {
        return(
            <Redirect to={state?.from || '/'} />
        )
    }
}

export default LoginPage;