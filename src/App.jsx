import styles from './app.module.css';
import {useRef, useState} from "react";

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

    const isFormValid = () => !Object.values(error).some(e => e !== '') && !Object.values(formData).some(f => f === '');

    const focusSubmitButtonIfValid = () => {
        if (isFormValid()) {
            submitButtonRef.current.focus();
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            sendForm({formData});
        }
    };

    const inputChange = (field, value, rule, errorMessage) => {
        setFormData(data => ({...data, [field]: value}));
        let fieldError = '';
        if (value === '') {
            fieldError = 'Поле не должно быть пустым';
        } else if (rule && !rule.test(value)) {
            fieldError = errorMessage;
        } else if (field === 'passwordRepeat' && value !== formData.password) {
            fieldError = 'Пароли не совпадают';
        }
        setError(error => ({...error, [`${field}Error`]: fieldError}));

        focusSubmitButtonIfValid();
    };

    const onBlur = (field) => {
        if (!formData[field]) {
            setError(error => ({...error, [`${field}Error`]: 'Поле не должно быть пустым'}));
        }
    };

    return (<form className={styles.formContainer} onSubmit={onSubmit}>
            <input
                className={styles.inputStyle}
                value={formData.email}
                onChange={({target}) => inputChange('email', target.value, ruleEmail, 'Неправильный формат электронной почты')}
                onBlur={() => onBlur('email')}
                type="text"
                name="email"
                placeholder="Email"
            />
            {error.emailError && <div>{error.emailError}</div>}

            <input
                className={styles.inputStyle}
                value={formData.password}
                onChange={({target}) => inputChange('password', target.value, rulePassword, 'Пароль должен содержать не менее 8 символов, число, строчную и заглавную буквы.')}
                onBlur={() => onBlur('password')}
                type="password"
                name="password"
                placeholder="Password"
            />
            {error.passwordError && <div>{error.passwordError}</div>}

            <input
                className={styles.inputStyle}
                value={formData.passwordRepeat}
                onChange={({target}) => inputChange('passwordRepeat', target.value, null, '')}
                onBlur={() => onBlur('passwordRepeat')}
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
        </form>);
};
