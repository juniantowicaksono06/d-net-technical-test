<?php 

namespace App\Traits;
use App\Models\Customers;
use App\Models\Subscriptions;

trait CustomerTrait {
    public function customerExists($id) {
        $customer = new Customers();
        $dataCustomer = $customer->where('id', $id)->first();
        if(empty($dataCustomer)) {
            return false;
        }
        return $dataCustomer;
    }

    public function subscriptionExists($id) {
        $subs = new Subscriptions();
        $dataSub = $subs->where('customer_id', $id)->first();
        if(empty($dataSub)) {
            return false;
        }
        return $dataSub;
    }
}