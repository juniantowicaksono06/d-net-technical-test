<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Support\Str;


class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("customers")->insert([
            [
                'id'         => Str::uuid()->toString(),
                'name'       => 'Joko',
                'email'      => 'joko1234@gmail.com',
                'phone'      => '081234567890',
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s'),
            ],
            [
                'id'         => Str::uuid()->toString(),
                'name'       => 'Budi',
                'email'      => 'budi1234@gmail.com',
                'phone'      => '085254874393',
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s'),
            ],
            [
                'id'         => Str::uuid()->toString(),
                'name'       => 'Anto',
                'email'      => 'anto1234@gmail.com',
                'phone'      => '085254874394',
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}