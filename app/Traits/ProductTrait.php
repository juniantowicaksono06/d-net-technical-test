<?php 

namespace App\Traits;
use App\Models\Products;
use App\Models\Subscriptions;

trait ProductTrait {
    public function productExists($id) {
        $product = new Products();
        $dataProduct = $product->where('id', $id)->first();
        if(empty($dataProduct)) {
            return false;
        }
        return $dataProduct;
    }

    public function subscriptionExists($id) {
        $subs = new Subscriptions();
        $dataSub = $subs->where('product_id', $id)->first();
        if(empty($dataSub)) {
            return false;
        }
        return $dataSub;
    }
}