import {
    Button, Layout,
} from 'antd';
import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { secureStorage } from 'shared/lib/crypt/crypt';
import { useAppDispatch, useAppSelector } from 'app/providers/store-provider/config/hooks';
import { authLogout } from 'features/authorization/model/slice/authSlice';
import { Navbar } from 'widgets/navbar';
import classes from './header.module.scss';

export const Header: FC = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogout = () => {
        secureStorage.clear();
        dispatch(authLogout());
        navigate('/login');
    };

    return (
        <Layout.Header>
            <Navbar />
            <div className={classes.profile}>
                <Button
                    type="primary"
                    onClick={onLogout}
                >
                    Выйти
                </Button>
            </div>
        </Layout.Header>
    );
});
