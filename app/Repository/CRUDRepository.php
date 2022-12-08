<?php
namespace App\Repository;

use Illuminate\Http\Request;

interface CRUDRepository
{

    public function all(Request $request);
    public function store(Request $request);
    public function update(Request $request,$object);
    public function destroy(Request $request);

}