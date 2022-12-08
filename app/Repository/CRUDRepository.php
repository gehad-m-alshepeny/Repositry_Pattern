<?php
namespace App\Repository;

use Illuminate\Http\Request;

interface CRUDRepository
{
  //  public function createTask(Request $request);

    public function all(Request $request);
    public function store(Request $request);
    public function destroy(Request $request);
 //   public function getById($id);
  //  public function updateTask(Request $request, $id);
   // public function setAsFinish($id);
}