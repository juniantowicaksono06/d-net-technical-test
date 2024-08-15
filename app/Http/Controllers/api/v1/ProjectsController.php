<?php 
namespace App\Http\Controllers\api\v1;



use App\Http\Controllers\Controller;
use App\Models\Subscriptions;
use App\Traits\ProductTrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Products;



class ProjectsController extends Controller {
    use ProductTrait;
    public function create(Request $request)
    {
        $user = $request->attributes->get('user');
        $validator = Validator::make($request->all(), [
            'customer'     => 'required|string',
            'product'      => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code'      => 400,
                'errors'    => $validator->errors()
            ], 200);
        }
        try {
            $s = new Subscriptions();
            $s->id = (string) \Illuminate\Support\Str::uuid();
            $s->customer_id = $request->customer;
            $s->product_id = $request->product;
            $s->submitted_by = $user['id'];
            $s->save();
            return response()->json([
                'code'      => 201,
                'message'   => "Berhasil menambahkan project",
                'data'      => [
                    'product'  => $s
                ]
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ]);
        }
    }
    
    public function read(Request $request) {
        $subs = new Subscriptions();
        try {
            //code...
            $data = $subs
            ->select('subscriptions.id', 'products.name AS project_name', 'customers.name AS customer_name', 'a1.name AS responded_by', 'subscriptions.status', 'a2.name AS submitted_by')
            ->leftJoin('products', 'subscriptions.product_id', '=', 'products.id')
            ->leftJoin('customers', 'subscriptions.customer_id', '=', 'customers.id')
            ->leftJoin('users AS a1', 'subscriptions.responded_by', '=', 'a1.id')
            ->leftJoin('users AS a2', 'subscriptions.submitted_by', '=', 'a2.id')
            ->get();
            return response()->json([
                'code'      => 200,
                'data'      => [
                    'subs'  => $data
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error',
                'debug'     => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, String $id) {
        $user = $request->attributes->get('user');

        if($user['role'] != 'manager') {
            return response()->json([
                'code'      => 401,
                'message'   => "Anda tidak memiliki akses"
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'type'     => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code'      => 400,
                'errors'    => $validator->errors()
            ], 200);
        }
        if($request->type != "approved" && $request->type != "rejected") {
            return response()->json([
                'code'      => 400,
                'message'   => "Type harus 'approved' atau 'rejected'"
            ]);
        }
        try {
            Subscriptions::where('id', $id)->update([
                'status'        => $request->type,
                'responded_by'  => $user['id'],
                'responded_date'=> date('Y-m-d H:i:s')
            ]);
            return response()->json([
                'code'      => 200,
                'message'   => "Berhasil mengupdate project"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }
    
    public function delete(Request $request, String $id) {
        $product = new Products();
        try {
            if($this->productExists($id) === false) {
                return response()->json([
                    'code'      => 404,
                    'message'   => "Tidak ada data ditemukan"
                ], 200);
            }
            if($this->subscriptionExists($id) === false) {
                $product->where('id', $id)->delete();
            }
            else {
                $product->where('id', $id)->update([
                    'status'    => 'NOT ACTIVE'
                ]);
            }
            return response()->json([
                'code'      => 200,
                'message'   => "Berhasil menghapus produk"
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }

    public function detail(Request $request, String $id) {
        $product = new Products();
        try {
            $dataProduct = $this->productExists($id);
            if($dataProduct === false) {
                return response()->json([
                    'code'      => 404,
                    'message'   => "Tidak ada data ditemukan"
                ], 200);
            }
            $dataProduct = $dataProduct->toArray();
            return response()->json([
                'code'      => 200,
                'data'      => $dataProduct
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'code'      => 500,
                'errors'    => 'Internal Server Error'
            ], 500);
        }
    }
}