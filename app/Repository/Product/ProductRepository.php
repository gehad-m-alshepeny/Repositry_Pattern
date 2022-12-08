<?php

namespace App\Repository\Product;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Repository\CRUDRepository;
use App\Http\Resources\ProductResource;

class ProductRepository implements CRUDRepository
{


    public function all(Request $request)
    {   
        $result =  new Product;
        $recordsTotal = $result->count();
        if ($request->filled('search.value')) 
            $result = $result->where('name', 'LIKE', "%{$request->input('search.value')}%")
            ->orWhere('description', 'LIKE', "%{$request->input('search.value')}%");
       
        
        $result= $result->skip(request('start'))
            ->take(request('length'))
            ->orderBy('id', 'desc')->get();

        $data = ProductResource::collection($result)
            ->additional([
                'draw' => intval(request('draw')),
                'recordsTotal' =>$result->count(),
                'recordsFiltered' =>$recordsTotal,
            ]);  
      return $data;
    }
    public function store(Request $request)
    {
        $validated = $request->safe()->only(['name','tags','description']);
        if ($request->has("productImage")) 
        {
            $productImage = $request->file("productImage")->store("public/products/");
            $validated['image'] = $productImage;
        }
        $validated['category_id']=$request->category_id;
        Product::create($validated);
        return response()->json(["status" => "success", "data" => ["redirectTo" => route("products.index")]], 200);
    }
       

    public function destroy(Request $request)
    {
        Product::where('id', $request->id)->delete();
        return response()->json(['status' => 'success'], 200);
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