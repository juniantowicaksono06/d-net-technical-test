import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from "@/layouts/RootLayout";
import RouteLoading from "@/components/RouteLoading";
import Error404 from "@/components/404";
import UnprotectedRoute from './UnprotectedRoute';
import LoadingProvider from "@/providers/LoadingProvider";

const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));

const Products = React.lazy(() => import('@/pages/Products/Products'));
const CreateProduct = React.lazy(() => import('@/pages/Products/CreateProduct'));
const EditProduct = React.lazy(() => import('@/pages/Products/EditProduct'));

const Projects = React.lazy(() => import('@/pages/Projects/Projects'));
const CreateProjects = React.lazy(() => import('@/pages/Projects/CreateProjects'));

const Customers = React.lazy(() => import('@/pages/Customers/Customers'));
const CreateCustomer = React.lazy(() => import('@/pages/Customers/CreateCustomer'));
const EditCustomer = React.lazy(() => import('@/pages/Customers/EditCustomer'));
const DetailCustomer = React.lazy(() => import('@/pages/Customers/DetailCustomer'));

import ProtectedRoute from './ProtectedRoute';
import ProfileProvider from './providers/UserProfileProvider';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={
                <ProfileProvider>
                    <LoadingProvider>
                        <RootLayout />
                    </LoadingProvider>
                </ProfileProvider>
            }
        >
            <Route
                index
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/products"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/projects"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/projects/create"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <CreateProjects />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/products/create"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <CreateProduct />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/products/edit/:id"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <EditProduct />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/customers"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/customers/create"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <CreateCustomer />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/customers/edit/:id"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <EditCustomer />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/customers/:id"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <ProtectedRoute>
                            <DetailCustomer />
                        </ProtectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="/login"
                element={
                    <React.Suspense fallback={<RouteLoading />}>
                        <UnprotectedRoute>
                            <Login />
                        </UnprotectedRoute>
                    </React.Suspense>
                }
            />
            <Route
                path="*"
                element={<Error404 />}
            />
        </Route>
    )
);

export default router;
