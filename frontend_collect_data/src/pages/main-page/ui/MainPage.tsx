import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import FileUpload from 'widgets/file-upload/ui/FileUpload';
import { Typography } from 'antd';
import classes from './mainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = ({ className }: MainPageProps) => (
    <div className={classNames(classes.MainPage, {}, [className])}>
        <div className={classes.main}>
            <Typography.Title level={1}>
                Сервис по сбору аналитических
                данных
            </Typography.Title>
            <Typography>
                Выберите необходимый сервис и сконвертируйте ваши данные из загруженных файлов в табличный
                вид
            </Typography>
            <FileUpload />
        </div>
    </div>
);

export default MainPage;
