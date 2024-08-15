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
    const [customers, setCustomers] = useState<APP.ICustomers[]>([]);
    const [products, setProducts] = useState<APP.IProducts[]>([]);
    const [initialValues, setInitialValues] = useState({
        customer: "",
        product: ""
    });
    const customerInputSchema = Yup.object().shape({
        customer: Yup.string().required('Input Customer wajib diisi'),
        product: Yup.string().required('Input Product wajib diisi')
    });

    async function getSelectData() {
        setIsLoading(true);
        var response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/customers/active`, {
            method: "GET"
        });
        var customerId = "";
        var productId = "";
        if(response.ok) {
            const result: API.IAPIResponse = await response.json();
            if(result.code == 200) {
                const data = result.data
                const currentData = data.customers as APP.ICustomers[];
                if(currentData.length > 0) {
                    customerId = currentData[0].id;
                }
                setCustomers(currentData);
            }
        }
        
        response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/products/active`, {
            method: "GET"
        });
        setIsLoading(false);
        if(response.ok) {
            const result: API.IAPIResponse = await response.json();
            if(result.code == 200) {
                const data = result.data;
                const currentData = data.products as APP.IProducts[];
                if(currentData.length > 0) {
                    productId = currentData[0].id;
                }
                setProducts(currentData);
            }
        }
        setInitialValues({
            ...initialValues,
            customer: customerId,
            product: productId
        });
    }

    useEffect(() => {
        document.title = "Tambah Project";
        getSelectData();
    }, []);
    const navigate = useNavigate();
    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Tambah Customer</h3>
            <div className='mt-4'>
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={() => {
                    navigate('/projects', 
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
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={customerInputSchema}
                        onSubmit={async(values, {resetForm}) => {
                            const data = {
                                ...values
                            };
                            setIsLoading(true);
                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/projects`, {
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
                                    <label htmlFor="customer" className="mb-2.5 block font-medium">
                                        Customer
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="customer"
                                            className="w-full rounded-lg border border-stroke bg-white py-3.5 px-5 font-medium text-black dark:border-strokedark dark:bg-boxdark"
                                            onClick={() => {
                                                console.log(initialValues)
                                            }}
                                        >
                                            {
                                                customers.map((customer) => {
                                                    return <option key={customer.id} value={customer.id}>{customer.name}</option>
                                                })
                                            }
                                        </Field>
                                    </div>
                                    {errors.customer && touched.customer ? (
                                        <div className="text-red-600">{errors.customer}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="mb-2.5 block font-medium">
                                        Produk
                                    </label>
                                    <div className="relative">
                                        <Field
                                            as="select"
                                            name="product"
                                            className="w-full rounded-lg border border-stroke bg-white py-3.5 px-5 font-medium text-black dark:border-strokedark dark:bg-boxdark"
                                        >
                                            {
                                                products.map((product) => {
                                                    return <option key={product.id} value={product.id}>{product.name}</option>
                                                })
                                            }
                                        </Field>
                                    </div>
                                    {errors.product && touched.product ? (
                                        <div className="text-red-600">{errors.product}</div>
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