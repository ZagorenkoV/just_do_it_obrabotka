import { FC, Suspense } from 'react';
import {
    Navigate, Outlet, Route, Routes,
} from 'react-router-dom';
import { Layout } from 'antd';
import { useAppSelector } from 'app/providers/store-provider/config/hooks';
import { privateRoutes, RouteNames } from 'shared/config/routeConfig/routeConfig';

import Spinner from 'shared/ui/spinner/Spinner';
import { LoginPage } from 'pages/login-page';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

const { Content } = Layout;

const PrivateRoutes = () => {
    const { isAuth } = useAppSelector((state) => state.auth);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const PublicRoutes = () => {
    const { isAuth } = useAppSelector((state) => state.auth);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

const AppRouter: FC = () => {
    const { isAuth } = useAppSelector((state) => state.auth);

    return (
        <Suspense fallback={<Spinner />}>
            <Layout>
                {isAuth && <Header />}
                <Layout>
                    <Content>
                        <Routes>
                            <Route element={<PrivateRoutes />}>
                                {privateRoutes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={<route.component />}
                                    />
                                ))}
                                <Route path={RouteNames.NAVIGATE} element={<Navigate replace to={RouteNames.MAIN} />} />
                            </Route>

                            <Route element={<PublicRoutes />}>
                                <Route path="/login" element={<LoginPage />} />
                            </Route>
                        </Routes>
                    </Content>
                </Layout>
                <Footer />
            </Layout>
        </Suspense>
    );
};

export default AppRouter;
