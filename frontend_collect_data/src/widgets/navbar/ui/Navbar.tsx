import React, { FC, memo } from 'react';
import { Typography } from 'antd';
import LogoSvg from 'app/assets/images/logo.svg';
import { Icon } from 'shared/ui/icon/Icon';
import classes from './navbar.module.scss';

export const Navbar: FC = memo(() => (
    <div className={classes.container}>
        <a href="/src/pages" className={classes.link}>
            <Icon className={classes.logo} Svg={LogoSvg} />
            <div className={classes.divider} />
        </a>
        <div>
            <Typography className={classes.title}>
                Цифровой_прорыв_2023
            </Typography>
        </div>
    </div>
));
