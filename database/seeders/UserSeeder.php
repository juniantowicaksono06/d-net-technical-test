<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use \Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table("users")->insert([
            [
                'id'         => Str::uuid()->toString(),
                'name'       => 'Joni',
                'email'      => 'joni@gmail.com',
                'phone'      => '081234567890',
                'password'   => Hash::make('Abcd1234'),
                'role'       => 'manager',
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s'),
            ],
            [
                'id'         => Str::uuid()->toString(),
                'name'       => 'Wawan',
                'email'      => 'wawan1234@gmail.com',
                'phone'      => '081234567891',
                'password'   => Hash::make('Abcd1234'),
                'role'       => 'sales',
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s'),
            ],
            [
                'id'         => Str::uuid()->toString(),
                'name'       => 'Alya',
                'email'      => 'alya1234@example.com',
                'phone'      => '0812345678912',
                'password'   => Hash::make('Abcd1234'),
                'role'       => 'sales',
                "created_at" => date('Y-m-d H:i:s'),
                "updated_at" => date('Y-m-d H:i:s'),
            ]
        ]);
    }
}
