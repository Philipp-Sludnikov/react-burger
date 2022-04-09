import styles from './register-page.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/register';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const RegisterForm: FC = () => {
    const dispatch = useAppDispatch();
    const [nameValue, setNameValue] = useState<string>('');
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const registerHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(emailValue, passwordValue, nameValue));
    }

    const isAuth = useAppSelector(store => store.auth.isAuth);

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

const RegisterPage:FC = () => {
  return (
    <section className={styles.registerWrapper}>
        <RegisterForm />
    </section>
  );  
}

export default RegisterPage;