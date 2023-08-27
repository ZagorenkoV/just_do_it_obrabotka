import React, { FC, useState } from 'react';
import {
    Button, Card, Form, Input, Typography,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import LogoSvg from 'app/assets/images/logo.svg';
import { secureStorage } from 'shared/lib/crypt/crypt';
import { useAppDispatch } from 'app/providers/store-provider/config/hooks';
import { authLogin } from 'features/authorization/model/slice/authSlice';
import { Icon } from 'shared/ui/icon/Icon';
import classes from './authForm.module.scss';

export const AuthForm: FC = () => {
    const [error, setError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onSubmit = (values: { login: string, password: string }) => {
        const hardcodedLogin = 'login';
        const hardcodedPass = 'password';
        if (values.login === hardcodedLogin && values.password === hardcodedPass) {
            const data = {
                isAuth: 'admin',
            };
            dispatch(authLogin());
            secureStorage.setItem('data', data);
            setError(false);
        }
        if (values.login !== hardcodedLogin || values.password !== hardcodedPass) {
            setError(true);
        }
    };

    return (
        <Card
            className={classes.card}
        >
            <Icon className={classes.logo} Svg={LogoSvg} />
            <Typography className={classes.description}>Сервис по сбору аналитических данных</Typography>
            <Form
                name="login_form"
                className={classes.form}
                initialValues={{ remember: true }}
                onFinish={(values) => onSubmit(values)}
                autoComplete="off"
            >
                <Form.Item
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Введите ваш логин',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        id="login"
                        size="large"
                        name="login"
                        placeholder="Логин"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Введите ваш пароль',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        size="large"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>

                {error
                    && (
                        <Typography className={classes.error}>
                            Неверное имя пользователя/пароль
                        </Typography>
                    )}

                <Form.Item>
                    <Typography className={classes.hint}>
                        По умолчанию: login / password
                    </Typography>
                </Form.Item>

                <Form.Item>
                    <div className={classes.actions}>
                        <Button block type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Card>
    );
};
