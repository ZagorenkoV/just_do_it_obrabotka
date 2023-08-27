import { render } from 'react-dom';
import ruRU from 'antd/es/locale/ru_RU';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.scss';
import { ConfigProvider } from 'antd';
import { StoreProvider } from 'app/providers/store-provider/ui/StoreProvider';
import { ErrorBoundary } from 'app/providers/error-boundary';
import App from './app/App';

render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ConfigProvider locale={ruRU}>
                    <App />
                </ConfigProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root'),
);
