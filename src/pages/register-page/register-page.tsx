import AppHeader from '../../components/app-header/app-header';
import styles from './register-page.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../services/actions/register';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { Redirect } from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const registerHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(emailValue, passwordValue, nameValue));
    }

    const isAuth = useSelector((store: RootStateOrAny) => store.auth.isAuth);

    return(
        !isAuth ? 
        <section className={styles.registerFormWrapper}>
            <p className={`text text_type_main-medium mb-6 ${styles.registerTitle}`}>Регистрация</p>
            <form className={`${styles.registerForm} mb-20`} onSubmit={registerHandler}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                />
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
                <Button type="primary" size="medium">Зарегистрироваться</Button>
            </form>
            <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? <Link to="/login" className={`text text_type_main-default ${styles.formLink}`}>Войти</Link></p>
        </section>
        : <Redirect to='/' />
    );
}

const RegisterPage= () => {
  return (<>
    <AppHeader />
    <section className={styles.registerWrapper}>
        <RegisterForm />
    </section>
  </>);  
}

export default RegisterPage;