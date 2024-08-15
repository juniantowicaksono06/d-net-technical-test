<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriptions extends Model {
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'subscriptions';

    protected $fillable = [
        'id',
        'customer_id',
        'product_id',
        'responded_by',
        'responded_date',
        'submitted_by',
        'status',
    ];

}