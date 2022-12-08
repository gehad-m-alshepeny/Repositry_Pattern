<?php

namespace App\Repository\Category;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Repository\CRUDRepository;
use App\Http\Resources\CategoryResource;

class CategoryRepository implements CRUDRepository
{

    public function all(Request $request)   
    {   
        $result =  new Category;
        $recordsTotal = $result->count();
        if ($request->filled('search.value')) 
            $result = $result->where('name', 'LIKE', "%{$request->input('search.value')}%");
       
        
        $result= $result->skip(request('start'))
            ->take(request('length'))
            ->orderBy('id', 'desc')->get();

        $data = CategoryResource::collection($result)
            ->additional([
                'draw' => intval(request('draw')),
                'recordsTotal' =>$result->count(),
                'recordsFiltered' =>$recordsTotal,
            ]);  
      return $data;
    }

    public function store(Request $request)
    {
        $validated = $request->safe()->only(['paren_name', 'name']);
        Category::create($validated);
        return response()->json(["status" => "success"], 200);
    }
    public function update(Request $request, $Category)
    {
    }

    public function destroy(Request $request)
    {
        Category::where('id', $request->id)->delete();
        return response()->json(['status' => 'success'], 200);
    }
  
 
}