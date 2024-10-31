import styles from './app.module.css';
import {useState} from "react";


const sendForm = (data) => {
    console.log(data)
}

export const App = () => {
    const [formData, setFormData] = useState({
        email: '', password: '', passwordRepeat: ''
    });
    const [error, setError] = useState({
        emailError: '', passwordError: '', passwordRepeatError: ''
    });

    const ruleEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const rulePassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    const activeButton = Object.values(error).some((e) => e !== '') || Object.values(formData).some((f) => f === '');

    const onSubmit = (event) => {
        event.preventDefault();
        for(let el in error){
            if(error[el] !== ''){
                return false
            }
        }
        for(let el in formData){
            if (formData[el] === ''){
                return false
            }
        }

        return sendForm({formData});
    }

    const onEmail = ({target}) => {
        setFormData({...formData, email: target.value})
        let newError = '';
        if (!ruleEmail.test(target.value)) {
            newError = 'Не правильный формат электронной почты.'
        }
        setError({...error, emailError: newError})
    }

    const onPassword = ({target}) => {
        setFormData({...formData, password: target.value})
        let newError = '';
        if (!rulePassword.test(target.value)) {
            newError = 'Пароль должен содержать не менее 8 символов, число, строчную, заглавную букву.'
        }
        setError({...error, passwordError: newError})
    }

    const onPasswordRepeat = ({target}) => {
        setFormData({...formData, passwordRepeat: target.value})
        let newError = '';
        if (formData.password !== target.value) {
            newError = 'Пароли не совпадают!'
        }
        setError({...error, passwordRepeatError: newError})
    }

    const onBlurEmail = ({target}) => {
        if  (target.value === ''){
            setError({...error, emailError: 'Поле не должно быть пустым'})
        }
    }
    const onBlurPassword = ({target}) => {
        if  (target.value === ''){
            setError({...error, passwordError: 'Поле не должно быть пустым'})
        }
    }
    const onBlurPasswordRepeat = ({target}) => {
        if  (target.value === ''){
            setError({...error, passwordRepeatError: 'Поле не должно быть пустым'})
        }
    }

    return (<form className={styles.formContainer} onSubmit={onSubmit}>
        <div></div>
        <input className={styles.inputStyle}
               value={formData.email}
               onChange={onEmail}
               onBlur={onBlurEmail}
               type="text" name="email"
               placeholder="Email"/>
        {error.emailError && <div>{error.emailError}</div>}
        <input className={styles.inputStyle}
               value={formData.password}
               onChange={onPassword}
               onBlur={onBlurPassword}
               type="password"
               name="password" placeholder="Password"/>
        {error.passwordError && <div>{error.passwordError}</div>}
        <input className={styles.inputStyle}
               value={formData.passwordRepeat}
               onChange={onPasswordRepeat}
               onBlur={onBlurPasswordRepeat}
               type="password" name="password" placeholder="Repeat Password"/>
        {error.passwordRepeatError && <div>{error.passwordRepeatError}</div>}
        <button className={styles.signButton} disabled={activeButton} type="submit">Sign-up</button>
    </form>)
}
