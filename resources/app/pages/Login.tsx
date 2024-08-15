import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import swal from 'sweetalert2';
import Loading from '@/components/Loading';
import {useEffect, useState, Fragment} from 'react'

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        password: "",
        email: ""
    };
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Input Email tidak valid')
        .required('Input Email wajib diisi'),
        password: Yup.string()
        .required('Input Password wajib diisi')
    });
    useEffect(() =>{ 
        document.title = "Login Page";
    })
    return (
        <Fragment>
            <div className="block">
                <div className="flex justify-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="mt-12 mb-2 text-center md:text-4xl font-bold text-black text-3xl">
                            Halaman Login
                        </h2>
                        <Formik 
                            initialValues={initialValues}
                            validationSchema={loginSchema}
                            onSubmit={async(values) => {
                                const data = {
                                    ...values
                                };
                                setIsLoading(true);
                                const baseURL = import.meta.env.VITE_BASE_URL as string
                                const response = await fetch(`${baseURL}/api/login`, {
                                    method: "POST",
                                    body: JSON.stringify(data),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                setIsLoading(false);
                                if(response.ok) {
                                    const result: API.IAPIResponse = await response.json();
                                    if(result.code == 200) {
                                        swal.fire({
                                            position: 'top',
                                            toast: true,
                                            icon: 'success',
                                            timer: 3000,
                                            title: "Berhasil",
                                            text: result.message,
                                            didClose: () => {
                                                window.location.href = `${window.location.origin as string}/`;
                                            },
                                            showConfirmButton: false
                                        });
                                    }
                                    else {
                                        let errors = result.errors as { [key: string]: string[] };
                                        let errorList = "<ol>";
                                        Object.keys(errors).forEach((key: string) => {
                                            errors[key].forEach((error: string) => {
                                                errorList += `<li>${error}</li>`;
                                            });
                                        });
                                        errorList += "</ol>";
                                        swal.fire({
                                            position: 'center',
                                            icon: 'warning',
                                            title: "Peringatan",
                                            html: errorList,
                                            showConfirmButton: true
                                        })
                                    }
                                }
                                else {
                                    swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: 'Error',
                                        text: "Error terjadi",
                                        showConfirmButton: true
                                    })
                                }
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="mb-2.5 block font-medium">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder="Masukkan Email"
                                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                            />
                                        </div>
                                        {errors.email && touched.email ? (
                                            <div className="text-red-600">{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="mb-2.5 block font-medium">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Masukkan Password"
                                                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                            />
                                        </div>
                                        {errors.password && touched.password ? (
                                            <div className="text-red-600">{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="submit"
                                            value="Login"
                                            disabled={isSubmitting}
                                            className="rounded-lg bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white px-3 py-2"
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Loading isLoading={isLoading} />
        </Fragment>
    );
}