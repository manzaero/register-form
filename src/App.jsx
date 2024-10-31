import styles from './app.module.css';
import { useState, useRef } from "react";

const sendForm = (data) => {
    console.log(data);
};

export const App = () => {
    const [formData, setFormData] = useState({
        email: '', password: '', passwordRepeat: ''
    });
    const [error, setError] = useState({
        emailError: '', passwordError: '', passwordRepeatError: ''
    });
    const submitButtonRef = useRef(null);

    const ruleEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const rulePassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;

    const isFormValid = () =>
        !Object.values(error).some(e => e !== '') &&
        !Object.values(formData).some(f => f === '');

    const focusSubmitButtonIfValid = () => {
        if (isFormValid()) {
            submitButtonRef.current.focus();
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            sendForm({ formData });
        }
    };

    const onEmail = ({ target }) => {
        const email = target.value;
        setFormData({ ...formData, email });

        const emailError = ruleEmail.test(email) ? '' : 'Неправильный формат электронной почты.';
        setError({ ...error, emailError });

        focusSubmitButtonIfValid();
    };

    const onPassword = ({ target }) => {
        const password = target.value;
        setFormData({ ...formData, password });

        const passwordError = rulePassword.test(password) ? '' : 'Пароль должен содержать не менее 8 символов, число, строчную и заглавную буквы.';
        setError({ ...error, passwordError });

        focusSubmitButtonIfValid();
    };

    const onPasswordRepeat = ({ target }) => {
        const passwordRepeat = target.value;
        setFormData({ ...formData, passwordRepeat });

        const passwordRepeatError = passwordRepeat === formData.password ? '' : 'Пароли не совпадают!';
        setError({ ...error, passwordRepeatError });

        focusSubmitButtonIfValid();
    };

    const onBlur = (field, message) => {
        if (!formData[field]) {
            setError(prevError => ({ ...prevError, [`${field}Error`]: message }));
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={onSubmit}>
            <input
                className={styles.inputStyle}
                value={formData.email}
                onChange={onEmail}
                onBlur={() => onBlur('email', 'Поле не должно быть пустым')}
                type="text"
                name="email"
                placeholder="Email"
            />
            {error.emailError && <div>{error.emailError}</div>}

            <input
                className={styles.inputStyle}
                value={formData.password}
                onChange={onPassword}
                onBlur={() => onBlur('password', 'Поле не должно быть пустым')}
                type="password"
                name="password"
                placeholder="Password"
            />
            {error.passwordError && <div>{error.passwordError}</div>}

            <input
                className={styles.inputStyle}
                value={formData.passwordRepeat}
                onChange={onPasswordRepeat}
                onBlur={() => onBlur('passwordRepeat', 'Поле не должно быть пустым')}
                type="password"
                name="passwordRepeat"
                placeholder="Repeat Password"
            />
            {error.passwordRepeatError && <div>{error.passwordRepeatError}</div>}

            <button
                ref={submitButtonRef}
                className={styles.signButton}
                disabled={!isFormValid()}
                type="submit"
            >
                Sign-up
            </button>
        </form>
    );
};