import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import Loading from '@/components/Loading';
import Swal from 'sweetalert2';

export default function Customers() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [Customers, setCustomers] = useState<APP.ICustomers[]>([])

    async function getData() {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/customers`);
        if(response.ok) {
            const result: API.IAPIResponse = await response.json();
            if(result.code == 200) {
                setCustomers(result.data.customers as APP.ICustomers[]);
            }
        }
        setIsLoading(false);
    }
    
    useEffect(() => {
        document.title = "List Customer";
        getData();
    }, []);

    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Halaman Customer</h3>
            <div className='mt-4'>
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={() => {
                    navigate('/customers/create', 
                        {
                            replace: true
                        }
                    )
                }}>
                    <span>
                        <FontAwesomeIcon icon={FaSolid.faPlus} className='mr-2' />
                        Tambah Customer
                    </span>
                </button>
            </div>
            <div className="mt-7 mb-2">
                {
                    Customers.length > 0 ?
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className='bg-gray-100 border-b'>
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-1/6">Action</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-2/2">Nama</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-1/6">Email</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-1/6">Phone</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-5/6">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Customers.map((customer, index) => {
                                    return <tr className={index % 2 == 0 ? 'bg-gray-50 border-b hover:bg-gray-100' : 'bg-gray-100 border-b hover:bg-gray-200'} key={index}>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button className='bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600' onClick={() => {
                                                    navigate(`/customers/${customer.id}`, {
                                                        replace: true
                                                    })
                                                }}>
                                                    <span>
                                                        <FontAwesomeIcon icon={FaSolid.faEye} />
                                                    </span>
                                                </button>
                                                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600' onClick={() => {
                                                    navigate(`/customers/edit/${customer.id}`, 
                                                        {
                                                            replace: true
                                                        }
                                                    )
                                                }}>
                                                    <span>
                                                        <FontAwesomeIcon icon={FaSolid.faEdit} />
                                                    </span>
                                                </button>
                                                {
                                                    customer.status == 'active' ? <button className='bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600' onClick={async() => {
                                                        Swal.fire({
                                                            title: 'Hapus Customer?',
                                                            text: `Anda akan menghapus customer ${customer.name}`,
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Ya, Hapus!',
                                                            cancelButtonText: 'Batal',
                                                        }).then(async(result) => {
                                                            if (result.isConfirmed) {
                                                                setIsLoading(true);
                                                                const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/customers/${customer.id}`, {
                                                                    method: "DELETE"
                                                                });
                                                                setIsLoading(false);
                                                                if(response.ok) {
                                                                    const result = await response.json() as API.IAPIResponse;
                                                                    if(result.code == 200) {
                                                                        getData();
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
                                                                        title: "Gagal",
                                                                        text: "Terjadi kesalahan",
                                                                        showConfirmButton: true
                                                                    });
                                                                }
                                                            }
                                                        })
                                                    }}>
                                                        <span>
                                                            <FontAwesomeIcon icon={FaSolid.faTrashAlt} />
                                                        </span>
                                                    </button> : <button className='bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600' onClick={async() => {
                                                    Swal.fire({
                                                        title: 'Aktifkan Customer?',
                                                        text: `Anda akan mengaktifkan customer ${customer.name}`,
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Ya, Hapus!',
                                                        cancelButtonText: 'Batal',
                                                    }).then(async(result) => {
                                                        if (result.isConfirmed) {
                                                            setIsLoading(true);
                                                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/customers/update/${customer.id}`, {
                                                                method: "POST"
                                                            });
                                                            setIsLoading(false);
                                                            if(response.ok) {
                                                                const result = await response.json() as API.IAPIResponse;
                                                                if(result.code == 200) {
                                                                    getData();
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
                                                                    title: "Gagal",
                                                                    text: "Terjadi kesalahan",
                                                                    showConfirmButton: true
                                                                });
                                                            }
                                                        }
                                                    })
                                                }}>
                                                    <span>
                                                        <FontAwesomeIcon icon={FaSolid.faCheck} />
                                                    </span>
                                                </button>
                                                }
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{customer.name}</td>
                                        <td className="py-3 px-4">{customer.email}</td>
                                        <td className="py-3 px-4">{customer.phone}</td>
                                        <td className={customer.status.toLowerCase() == 'active' ? "py-3 px-4 text-green-500" : "py-3 px-4 text-red-500"}>{customer.status.toUpperCase()}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    : <div className='text-center text-gray-500 font-bold mb-3'>
                        <h1 className="text-2xl">Tidak ada customer ditemukan</h1>
                    </div>
                }
                
            </div>
        </div>
        <Loading isLoading={isLoading} />
    </Fragment>
}