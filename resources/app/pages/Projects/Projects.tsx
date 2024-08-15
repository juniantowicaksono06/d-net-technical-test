import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FaSolid from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import Loading from '@/components/Loading';
import Swal from 'sweetalert2';
import { useProfile } from '@/providers/UserProfileProvider';

export default function Projects() {
    const navigate = useNavigate();
    
    const {state} = useProfile();
    const [isLoading, setIsLoading] = useState(false);

    const [Projects, setProjects] = useState<APP.IProjects[]>([])

    async function getData() {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/projects`);
        if(response.ok) {
            const result: API.IAPIResponse = await response.json();
            if(result.code == 200) {
                setProjects(result.data.subs as APP.IProjects[]);
            }
        }
        setIsLoading(false);
    }
    
    useEffect(() => {
        document.title = "List Project";
        getData();
    }, []);

    return <Fragment>
        <div className="border border-gray-200 px-3 py-2">
            <h3 className="text-2xl font-bold">Halaman Project</h3>
            <div className='mt-4'>
                <button className='bg-blue-500 text-white px-3 py-2 rounded-lg' onClick={() => {
                    navigate('/projects/create', 
                        {
                            replace: true
                        }
                    )
                }}>
                    <span>
                        <FontAwesomeIcon icon={FaSolid.faPlus} className='mr-2' />
                        Tambah Project
                    </span>
                </button>
            </div>
            <div className="mt-7 mb-2">
                {
                    Projects.length > 0 ?
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className='bg-gray-100 border-b'>
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm">Action</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm">Nama Customer</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm">Nama Produk / Layanan</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm">Di Ajukan Oleh</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm">Di Approve / Di Tolak Oleh</th>
                                <th className="text-left py-3 px-4 uppercase font-bold text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Projects.map((project, index) => {
                                    return <tr className={index % 2 == 0 ? 'bg-gray-50 border-b hover:bg-gray-100' : 'bg-gray-100 border-b hover:bg-gray-200'} key={index}>
                                        <td className="py-3 px-4">
                                            {
                                                state.profile?.role == 'manager' && project.status == 'pending' ? <div className="flex gap-2">
                                                <button className='bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600' onClick={async() => {
                                                    Swal.fire({
                                                        title: 'Approve Project?',
                                                        text: "Anda yakin ingin menyetujui project ini?",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Ya, Setuju',
                                                        cancelButtonText: 'Tidak Setuju'
                                                    }).then(async(response) => {
                                                        if(response.isConfirmed) {
                                                            setIsLoading(true);
                                                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/projects/${project.id}`, {
                                                                method: "POST",
                                                                body: JSON.stringify({
                                                                    type: "approved"
                                                                }),
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                }
                                                            });
                                                            setIsLoading(false);
                                                            if(response.ok) {
                                                                const result = await response.json() as API.IAPIResponse;
                                                                if(result.code == 200) {
                                                                    Swal.fire({
                                                                        toast: true,
                                                                        icon: 'success',
                                                                        title: "Berhasil",
                                                                        text: result.message,
                                                                        position: 'top',
                                                                        timer: 3000,
                                                                        showConfirmButton: false
                                                                    })
                                                                }
                                                                getData();
                                                            }
                                                        }
                                                    })
                                                }}>
                                                    <span>
                                                        <FontAwesomeIcon icon={FaSolid.faCheck} />
                                                    </span>
                                                </button>
                                                <button className='bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600' onClick={async() => {
                                                    Swal.fire({
                                                        title: 'Reject Project?',
                                                        text: "Anda yakin ingin menolak project ini?",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Ya, Tolak',
                                                        cancelButtonText: 'Tidak'
                                                    }).then(async(response) => {
                                                        if(response.isConfirmed) {
                                                            setIsLoading(true);
                                                            const response = await fetch(`${import.meta.env.VITE_BASE_URL as string}/api/projects/${project.id}`, {
                                                                method: "POST",
                                                                body: JSON.stringify({
                                                                    type: "rejected"
                                                                }),
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                }
                                                            });
                                                            setIsLoading(false);
                                                            if(response.ok) {
                                                                const result = await response.json() as API.IAPIResponse;
                                                                if(result.code == 200) {
                                                                    Swal.fire({
                                                                        toast: true,
                                                                        icon: 'success',
                                                                        title: "Berhasil",
                                                                        text: result.message,
                                                                        position: 'top',
                                                                        timer: 3000,
                                                                        showConfirmButton: false
                                                                    })
                                                                }
                                                                getData();
                                                            }
                                                        }
                                                    })
                                                }}>
                                                    <span>
                                                        <FontAwesomeIcon icon={FaSolid.faTimes} />
                                                    </span>
                                                </button>
                                            </div> : <></>
                                            }
                                        </td>
                                        <td className="py-3 px-4">{project.customer_name}</td>
                                        <td className="py-3 px-4">{project.project_name}</td>
                                        <td className="py-3 px-4">{project.submitted_by}</td>
                                        <td className="py-3 px-4">{project.responded_by == "" || project.responded_by == null ? "" : project.responded_by}</td>
                                        <td className={project.status.toLowerCase() == 'approved' ? "py-3 px-4 text-green-500" : project.status.toLowerCase() == 'pending' ? "py-3 px-4" : "py-3 px-4 text-red-500"}>{project.status.toUpperCase()}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    : <div className='text-center text-gray-500 font-bold mb-3'>
                        <h1 className="text-2xl">Tidak ada project ditemukan</h1>
                    </div>
                }
                
            </div>
        </div>
        <Loading isLoading={isLoading} />
    </Fragment>
}