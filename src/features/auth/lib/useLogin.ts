import {useAppSelector} from "app/store";
import {selectAuthCaptchaUrl, selectAuthIsLoggedIn} from "features/auth/model/authSelectors";
import {useActions} from "common/hooks/useActions";
import {authThunks} from "features/auth/model/authSlice";
import {FormikHelpers, useFormik} from "formik";
import {LoginParamsType} from "features/auth/api/authAPI.types";
import {BaseResponseType} from "common/type";

export const useLogin = () => {
    const isLoggedIn = useAppSelector<boolean>(selectAuthIsLoggedIn)
    const captchaUrl = useAppSelector<string | null>(selectAuthCaptchaUrl)

    const {login} = useActions(authThunks)
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {}
            const trimmedEmail = values.email.trim(); // Обрезаем пробелы
            const trimmedPassword = values.password.trim();
            if (!trimmedEmail) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(trimmedEmail)) {
                errors.email = 'Invalid email address';
            }

            if (!trimmedPassword) {
                errors.password = 'Required'
            } else if (trimmedPassword.length < 3) {
                errors.password = 'Password should be more then 3 symbols'
            }
            return errors

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            // captcha: null,
        },
        onSubmit: (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
            const trimmedValues = {
                ...values,
                email: values.email.trim(),
                password: values.password.trim(),
            };
            login(trimmedValues)
                .unwrap()
                .catch((res: BaseResponseType) => {
                    //🔅 поставили ? знак для того чтобы если нет этих полей не падала ошибка в консоли
                    res.fieldsErrors?.forEach((fieldError) => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
        },
    })

    return {formik,isLoggedIn,captchaUrl}
};

//type
type FormikErrorType=Partial<Omit<LoginParamsType,'captcha'>>

