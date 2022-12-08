<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            'category' => $this->category->name ,
            'category_id' => $this->category_id,
            "image" => (!is_null($this->image) || !empty($this->image)) ? str_replace("public","/storage",$this->image) : asset('admin/assets/img/vendors/img-placehollder.png'),
            
        ];
    }
}
