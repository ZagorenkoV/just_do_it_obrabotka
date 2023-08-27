import React, { useEffect, useState } from 'react';
import {
    Upload, Button, message, Typography,
} from 'antd';
import axios from 'axios';
import { Block } from 'shared/ui/block/Block';
import { FileDoneOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/providers/store-provider/config/hooks';
import { setCategoryType } from 'entities/category/model/slice/categorySlice';
import { CategoryTypes } from 'entities/category/model/types/categorySchema';
import { SERVER_URL } from 'app/config';
import classes from './fileUpload.module.scss';
import vkIcon from '../../../app/assets/images/icon-vk.png';
import tgIcon from '../../../app/assets/images/icon-telegram.png';
import ytIcon from '../../../app/assets/images/icon-youtube.png';
import dzIcon from '../../../app/assets/images/icon-yandex.png';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const { categoryType } = useAppSelector((state) => state.category);

    const [fileList, setFileList] = useState<any[]>([]);

    const [downloadLink, setDownloadLink] = useState<string>();

    useEffect(() => {
        if (downloadLink) {
            setFileList([]);
        }
    }, [downloadLink]);

    const onCategoryChange = (category: string) => {
        dispatch(setCategoryType(category));
    };

    const handleUpload = async () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files', file.originFileObj);
        });

        try {
            message.loading({ content: 'Загрузка...', key: 'uploadFile', duration: 0 });
            const response = await axios.post(`${SERVER_URL}/api/upload_${categoryType}/`, formData);
            const newLink = response.data.processed_files;
            setDownloadLink(newLink);
            message.success({ content: 'Успешно загружено', key: 'uploadFile' });
        } catch (error) {
            message.error({ content: 'Не удалось загрузить', key: 'uploadFile' });
        }
    };
    const handleFileChange = (info: any) => {
        setFileList(info.fileList);
    };

    const downloadFile = async () => {
        try {
            message.loading({ content: 'Cкачивание...', key: 'downloadFile', duration: 0 });
            await fetch(`${SERVER_URL}/api/download/`, {
                method: 'GET',
            })
                .then((res) => res.blob())
                .then((data) => {
                    const url = URL.createObjectURL(data);
                    const anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.download = 'downloadLink';
                    document.body.append(anchor);
                    anchor.click();
                    anchor.remove();

                    URL.revokeObjectURL(url);
                });
            message.success({ content: 'Файл скачан', key: 'downloadFile' });
        } catch (error) {
            message.error({ content: 'Не удалось скачать файл', key: 'downloadFile' });
        }
    };

    return (
        <Block>
            <div className={classes.wrapper}>

                <div>
                    <img
                        width={50}
                        src={vkIcon}
                        alt="vk.png"
                        className={categoryType === CategoryTypes.VK ? classes['service-img-active'] : classes['service-img']}
                        onClick={() => onCategoryChange(CategoryTypes.VK)}
                    />
                    <img
                        width={50}
                        src={tgIcon}
                        alt="tg.png"
                        className={categoryType === CategoryTypes.TG ? classes['service-img-active'] : classes['service-img']}
                        onClick={() => onCategoryChange(CategoryTypes.TG)}
                    />
                    <img
                        width={50}
                        src={ytIcon}
                        alt="yt.png"
                        className={categoryType === CategoryTypes.YT ? classes['service-img-active'] : classes['service-img']}
                        onClick={() => onCategoryChange(CategoryTypes.YT)}
                    />
                    <img
                        width={53}
                        src={dzIcon}
                        alt="dz.png"
                        className={categoryType === CategoryTypes.DZ ? classes['service-img-active'] : classes['service-img']}
                        onClick={() => onCategoryChange(CategoryTypes.DZ)}
                    />
                </div>
                <div className={classes.container}>

                    <Upload.Dragger
                        fileList={fileList}
                        onChange={handleFileChange}
                        multiple
                        className={classes.upload}
                    >
                        <div className={classes['upload-wrapper']}>
                            <div className={classes['upload-icon']}>
                                <p>
                                    <FileDoneOutlined />
                                </p>
                            </div>
                            <div>
                                <p className={classes['upload-text']}>Приложите файлы</p>
                                <p className={classes['upload-hint']}>
                                    Нажмите на поле или перетащите в него файлы
                                </p>
                            </div>
                        </div>
                    </Upload.Dragger>

                    {downloadLink && (
                        <div className={classes.attachment}>
                            <Typography className={classes['attachment-title']}>Ссылка на готовый файл:</Typography>
                            <div
                                onClick={downloadFile}
                            >

                                <Button className={classes.link}>
                                    Скачать файл
                                </Button>

                            </div>
                        </div>
                    )}
                </div>
                <Button
                    disabled={!fileList.length}
                    onClick={handleUpload}
                    type="primary"
                    className={classes['upload-btn']}
                >
                    Загрузить
                </Button>
            </div>
        </Block>

    );
};

export default App;
