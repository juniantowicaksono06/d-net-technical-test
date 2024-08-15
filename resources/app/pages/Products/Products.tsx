import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import Loading from '@/components/Loading';
import Swal from 'sweetalert2';

export default function Products() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [products, setProducts] = useState<APP.IProducts[]>([])

    async function getData() {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/products`);
        if(response.ok) {
            const result: API.IAPIResponse = await response.json();
            if(result.code == 200) {
                setProducts(result.data.products as APP.IProducts[]);
            }
        }
        setIsLoading(false);
    }
    
    useEffect(() => {
        document.title = "List Produk";
        getData();
    }, []);

    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Halaman Produk</h3>
            <div className='mt-4'>
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={() => {
                    navigate('/products/create', 
                        {
                            replace: true
                        }
                    )
                }}>
                    <span>
                        <FontAwesomeIcon icon={FaSolid.faPlus} className='mr-2' />
                        Tambah Produk
                    </span>
                </button>
            </div>
            <div className="mt-7 mb-2">
                {
                    products.length > 0 ?
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className='bg-gray-100 border-b'>
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-1/6">Action</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-2/6">Nama</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-2/6">Harga</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm w-5/6">Status</th>
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
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600' onClick={() => {
                                                    navigate(`/products/edit/${product.id}`, 
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
                                                    product.status == 'active' ? 
                                                    <button className='bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600' onClick={async() => {
                                                        Swal.fire({
                                                            title: 'Hapus Produk?',
                                                            text: `Anda akan menghapus produk ${product.name}`,
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Ya, Hapus!',
                                                            cancelButtonText: 'Batal',
                                                        }).then(async(result) => {
                                                            if (result.isConfirmed) {
                                                                setIsLoading(true);
                                                                const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/products/${product.id}`, {
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
                                                    </button> : 
                                                <button className='bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600' onClick={async() => {
                                                    Swal.fire({
                                                        title: 'Aktifkan Produk?',
                                                        text: `Anda akan mengaktifkan produk ${product.name}`,
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Ya, Aktifkan!',
                                                        cancelButtonText: 'Batal',
                                                    }).then(async(result) => {
                                                        if (result.isConfirmed) {
                                                            setIsLoading(true);
                                                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/products/update/${product.id}`, {
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
                                        <td className="py-3 px-4">{product.name}</td>
                                        <td className="py-3 px-4">{formattedPrice}</td>
                                        <td className={product.status.toLowerCase() == 'active' ? "py-3 px-4 text-green-500" : "py-3 px-4 text-red-500"}>{product.status.toUpperCase()}</td>
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
        <Loading isLoading={isLoading} />
    </Fragment>
}