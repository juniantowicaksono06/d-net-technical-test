import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import swal from 'sweetalert2';
import Loading from '@/components/Loading';
import { useEffect, useState, Fragment } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function CreateProduct() {
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {
        name: "",
        price: 0,
    };
    const productInputSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Input Nama Produk minimal 3 karakter')
        .required('Input Nama Produk wajib diisi'),
        price: Yup.number().typeError('Input Harga harus berupa angka').required('Input Harga wajib diisi').positive('Input harga harus lebih dari 0')
    });
    useEffect(() => {
        document.title = "Tambah Produk";
    });
    const navigate = useNavigate();
    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Tambah Produk</h3>
            <div className='mt-4'>
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={() => {
                    navigate('/products', 
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
                        validationSchema={productInputSchema}
                        onSubmit={async(values, {resetForm}) => {
                            const data = {
                                ...values
                            };
                            setIsLoading(true);
                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/products`, {
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
                                    swal.fire({
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
                                    swal.fire({
                                        position: 'top',
                                        icon: 'warning',
                                        title: "Gagal",
                                        text: result.message,
                                        showConfirmButton: true
                                    });
                                }
                            }
                            else {
                                swal.fire({
                                    icon: 'error',
                                    title: "Error",
                                    text: "Telah terjadi kesalahan",
                                    showConfirmButton: true
                                });
                            }
                        }}
                    >
                        {({ isSubmitting, errors, touched, values, setValues }) => (
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
                                            placeholder="Masukkan Nama Produk"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.name && touched.name ? (
                                        <div className="text-red-600">{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="mb-2.5 block font-medium">
                                        Harga
                                    </label>
                                    <div className="relative flex">
                                        <div>
                                            <p className='rounded-l-lg border-t border-l border-b border-stroke bg-transparent px-3 py-4 outline-none focus:border-primary'>Rp</p>
                                        </div>
                                        <CurrencyInput
                                            id="nominal"
                                            name="nominal"
                                            placeholder="Minimum 1000"
                                            defaultValue={1000}
                                            decimalsLimit={2}
                                            allowNegativeValue={false}
                                            step={500}
                                            value={values.price}
                                            onValueChange={(value) => {
                                                let number = 0;
                                                if(value != null && value.length > 0) {
                                                    number = parseInt(value as string);
                                                }
                                                setValues({
                                                    ...values,
                                                    price: number
                                                })
                                            }}
                                            className="w-full rounded-r-lg border-t border-r border-b border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                                        />
                                    </div>
                                    {errors.price && touched.price ? (
                                        <div className="text-red-600">{errors.price}</div>
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