import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading';
import { useEffect, useState, Fragment } from 'react';

export default function CreateProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        name: "",
        email: "",
        phone: ""
    };
    const customerInputSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Input Nama Customer minimal 3 karakter')
        .required('Input Nama Customer wajib diisi'),
        email: Yup.string().email().required('Input Email wajib diisi'),
        phone: Yup.string().required('Input Nomor Telepon wajib diisi')
    });
    useEffect(() => {
        document.title = "Tambah Customer";
    });
    const navigate = useNavigate();
    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Tambah Customer</h3>
            <div className='mt-4'>
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={() => {
                    navigate('/customers', 
                        {
                            replace: true
                        }
                    )
                }}>
                    <span>
                        <FontAwesomeIcon icon={FaSolid.faChevronLeft} className='mr-2' />
                        Kembali
                    </span>
                </button>

                <div className="mt-3">
                    <Formik 
                        initialValues={initialValues}
                        validationSchema={customerInputSchema}
                        onSubmit={async(values, {resetForm}) => {
                            const data = {
                                ...values
                            };
                            setIsLoading(true);
                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/customers`, {
                                method: "POST",
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            setIsLoading(false);
                            if(response.ok) {
                                const result: API.IAPIResponse = await response.json();
                                if(result.code == 200 || result.code == 201) {
                                    resetForm();
                                    Swal.fire({
                                        toast: true,
                                        position: 'top',
                                        timer: 3000,
                                        icon: 'success',
                                        title: "Berhasil",
                                        text: result.message,
                                        showConfirmButton: false
                                    });
                                }
                                else {
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'warning',
                                        title: "Gagal",
                                        text: result.message,
                                        showConfirmButton: true
                                    });
                                }
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error",
                                    text: "Telah terjadi kesalahan",
                                    showConfirmButton: true
                                });
                            }
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="mb-2.5 block font-medium">
                                        Nama
                                    </label>
                                    <div className="relative">
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Masukkan Nama Customer"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.name && touched.name ? (
                                        <div className="text-red-600">{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="mb-2.5 block font-medium">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Field
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="Masukkan Email Customer"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.email && touched.email ? (
                                        <div className="text-red-600">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="mb-2.5 block font-medium">
                                        Phone
                                    </label>
                                    <div className="relative">
                                        <Field
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            placeholder="Masukkan Nomor Telepon Customer"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.phone && touched.phone ? (
                                        <div className="text-red-600">{errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="submit"
                                        value="Submit"
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
}