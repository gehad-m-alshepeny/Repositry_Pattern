<?php

namespace App\Repository\Product;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Repository\CRUDRepository;

class ProductRepository implements CRUDRepository
{

    public function get()
    {
        return Product::select('id','name','description','status')->get();
    }

 /*   public function getTasksById($id)
    {
       return Task::select('id','name','description','status')->whereId($id)->first();
    }

    public function createTask(Request $request)
    {
        $task = new Task;
        $task->name = $request->name;
        $task->description = $request->description;
        $task->save();
        return $task;
    }


    public function setAsFinish($id)
    {
        $task = Task::whereId($id)->first();
        if ($task != null){
            $task->status = true;
            $task->save();
            return $task;
        }
        return null;
    }

    public function updateTask(Request $request, $id)
    {
        $task = Task::whereId($id)->first();
        if ($task != null) {
            $task->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);
            return $task;
        }
        return null;
    }

    public function getTaskWithComments($id){
        return Task::select('id','name','description','status')
            ->whereId($id)
            ->with('comments')->first();
    }*/
}