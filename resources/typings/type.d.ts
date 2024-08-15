namespace API {
    interface IAPIResponse {
        code: number;
        message: string;
        data: { [key: string]: any }
        errors: object | string;
    }
}

namespace APP {
    interface IUserProfile {
        id: string;
        nip: string;
        name: string;
        email: string;
        phone: string;
        role: 'manager' | 'sales';
        picture: string;
    }

    interface IProducts {
        id: string;
        name: string;
        price: number;
        status: string;
    }

    interface ICustomers {
        id: string;
        name: string;
        email: string;
        phone: string;
        status: string;
    }

    interface IProjects {
        id: string;
        customer_name: string;
        project_name: string;
        submitted_by: string;
        responded_by: string;
        status: string;
    }
}