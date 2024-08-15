<?php 
namespace App\Http\Controllers\api\v1;



use App\Http\Controllers\Controller;
use App\Traits\ProductTrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Products;



class ProductsController extends Controller {
    use ProductTrait;
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|min:3',
            'price'    => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code'      => 400,
                'errors'    => $validator->errors()
            ], 200);
        }
        try {
            $p = new Products();
            $p->id = (string) \Illuminate\Support\Str::uuid();
            $p->name = $request->name;
            $p->price = $request->price;
            $p->save();
            return response()->json([
                'code'      => 201,
                'message'   => "Berhasil menambahkan produk",
                'data'      => [
                    'product'  => $p
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
        $product = new Products();
        try {
            $data = $status != "" ? $product->where('status', $status)->get() : $product->get();
            return response()->json([
                'code'      => 200,
                'data'      => [
                    'products'  => $data
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
            'price'    => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code'      => 400,
                'errors'    => $validator->errors()
            ], 200);
        }
        try {
            Products::where('id', $id)->update([
                'name'     => $request->name,
                'price'    => $request->price
            ]);
            return response()->json([
                'code'      => 200,
                'message'   => "Berhasil mengupdate produk"
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

    public function activate(Request $request, String $id) {
        $product = new Products();
        try {
            if($this->productExists($id) === false) {
                return response()->json([
                    'code'      => 404,
                    'message'   => "Tidak ada data ditemukan"
                ], 200);
            }
            $product->where('id', $id)->update([
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