import { Fragment, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
export default function DetailCustomer() {
    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState({} as APP.ICustomers);
    const [products, setProducts] = useState<APP.IProducts[]>([]);
    const navigate = useNavigate();
    let params = useParams();
    async function getData() {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/customers/detail/${params.id}`, {
            method: "GET"
        });
        setIsLoading(false);
        if(response.ok) {
            const result: API.IAPIResponse = await response.json();
            if(result.code == 200) {
                const data = result.data;
                const dataCustomer = data.customer as APP.ICustomers;
                const dataSubs = data.subscriptions as APP.IProducts[];
                setCustomer({
                    ...customer,
                    name: dataCustomer.name,
                    email: dataCustomer.email,
                    phone: dataCustomer.phone
                });
                setProducts(dataSubs);
            }
            else if(result.code == 404) {
                Swal.fire({
                    icon: 'warning',
                    title: result.message,
                    showConfirmButton: true
                }).then((result) => {
                    if(result.isConfirmed) {
                        navigate('/customers', 
                            {
                                replace: true
                            }
                        );
                    }
                })
            }
        }
    }
    useEffect(() => {
        document.title = "Detail Customer";
        getData();
    }, [])
    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Detail Customer</h3>
            <div className='mt-4 mb-4'>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className='border-b'>
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-bold text bg-gray-100 w-2/5">Nama Customer</th>
                            <th className="text-left py-3 px-4 uppercase font-bold text">{customer.name}</th>
                        </tr>
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-bold text bg-gray-100 w-2/5">Email Customer</th>
                            <th className="text-left py-3 px-4 uppercase font-bold text">{customer.email}</th>
                        </tr>
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-bold text bg-gray-100 w-2/5">No. HP Customer</th>
                            <th className="text-left py-3 px-4 uppercase font-bold text">{customer.phone}</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="mb-4">
                <h3 className="text-2xl font-bold">Subscription</h3>
                <div className="mt-4 mb-4">
                    {
                        products.length > 0 ?
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead className='bg-gray-100 border-b'>
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-bold text-sm w-4/6">Nama</th>
                                    <th className="text-left py-3 px-4 uppercase font-bold text-sm w-2/6">Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, index) => {
                                        const price = parseFloat(product.price as unknown as string);
                                        const formattedPrice = new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 0
                                        }).format(price);
                                        return <tr className={index % 2 == 0 ? 'bg-gray-50 border-b hover:bg-gray-100' : 'bg-gray-100 border-b hover:bg-gray-200'} key={index}>
                                            <td className="py-3 px-4">{product.name}</td>
                                            <td className="py-3 px-4">{formattedPrice}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        : <div className='text-center text-gray-500 font-bold mb-3'>
                            <h1 className="text-2xl">Tidak ada produk ditemukan</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
        <Loading isLoading={isLoading} />
    </Fragment>
}