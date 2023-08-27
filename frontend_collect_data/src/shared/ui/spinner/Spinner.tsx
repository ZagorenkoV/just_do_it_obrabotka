import React, { FC, memo } from 'react';
import { Spin } from 'antd';
import classes from './spinner.module.scss';

const Spinner: FC = memo(() => (
    <Spin className={classes.wrapper} />
));

export default Spinner;
