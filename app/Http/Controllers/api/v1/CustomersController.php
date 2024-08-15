<?php 
namespace App\Http\Controllers\api\v1;



use App\Http\Controllers\Controller;
use App\Models\Customers;
use App\Models\Subscriptions;
use App\Traits\CustomerTrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Products;



class CustomersController extends Controller {
    use CustomerTrait;
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|min:3',
            'email'    => 'required|email',
            'phone'    => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code'      => 400,
                'errors'    => $validator->errors()
            ], 200);
        }
        try {
            $c = new Customers();
            $c->id    = (string) \Illuminate\Support\Str::uuid();
            $c->name  = $request->name;
            $c->email = $request->email;
            $c->phone = $request->phone;
            $c->save();
            return response()->json([
                'code'      => 201,
                'message'   => "Berhasil menambahkan Customer",
                'data'      => [
                    'customers'  => $c
                ]
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ]);
        }
    }
    
    public function read(Request $request, String $status = "") {
        $customer = new Customers();
        try {
            //code...
            // $data = $customer->get();
            
            $data = $status != "" ? $customer->where('status', $status)->get() : $customer->get();
            return response()->json([
                'code'      => 200,
                'data'      => [
                    'customers'  => $data
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }

    public function update(Request $request, String $id) {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|min:3',
            'email'    => 'required|email',
            'phone'    => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code'      => 400,
                'errors'    => $validator->errors()
            ], 200);
        }
        try {
            Customers::where('id', $id)->update([
                'name'     => $request->name,
                'phone'    => $request->phone,
                'email'    => $request->email
            ]);
            return response()->json([
                'code'      => 200,
                'message'   => "Berhasil mengupdate customer"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }
    
    public function delete(Request $request, String $id) {
        $customer = new Customers();
        try {
            if($this->customerExists($id) === false) {
                return response()->json([
                    'code'      => 404,
                    'message'   => "Tidak ada data ditemukan"
                ], 200);
            }
            if($this->subscriptionExists($id) === false) {
                $customer->where('id', $id)->delete();
            }
            else {
                $customer->where('id', $id)->update([
                    'status'    => 'deactivated'
                ]);
            }
            return response()->json([
                'code'      => 200,
                'message'   => "Berhasil menghapus customer"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }

    public function detail(Request $request, String $id) {
        try {
            $dataCustomer = $this->customerExists($id);
            if($dataCustomer === false) {
                return response()->json([
                    'code'      => 404,
                    'message'   => "Tidak ada data ditemukan"
                ], 200);
            }
            $dataCustomer = $dataCustomer->toArray();
            $subs = new Subscriptions();
            $dataSubscription = $subs
            ->leftJoin('products', 'subscriptions.product_id', '=', 'products.id')
            ->where('customer_id', $id)
            ->where('subscriptions.status', 'approved')
            ->get();
            return response()->json([
                'code'      => 200,
                'data'      => [
                    'customer'      => $dataCustomer,
                    'subscriptions' => $dataSubscription
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }
    
    public function activate(Request $request, String $id) {
        $customer = new Customers();
        try {
            if($this->customerExists($id) === false) {
                return response()->json([
                    'code'      => 404,
                    'message'   => "Tidak ada data ditemukan"
                ], 200);
            }
            $customer->where('id', $id)->update([
                'status'    => "active"
            ]);
            return response()->json([
                'code'      => 200,
                'message'   => "Berhasil mengupdate status"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }
}