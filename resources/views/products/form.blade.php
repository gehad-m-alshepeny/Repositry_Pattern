@extends('layouts.internal')
@section('title', 'Products')

@section('content')
<div class="theme-container">
        <div class="page-head">
            <a href="{{ route('products.index') }}" class="back">Products</a>
            <p class="title">
            {{ (isset($product)) ? 'Edit' : 'Add' }} Product
            </p>
           
            <div class="btns"> </div>
        </div>
        <div class="with-live-preview">
             
                 @if (isset($product))
                      <form id="productForm" action="{{route('products.update', $product)}}" method="POST" class="form-container">
    
                    @else
                    <form id="productForm" action="{{route('products.store')}}" method="POST" class="form-container">
                    @endif
                     @csrf
                 <div class="row">
                     <div class="col-12 col-sm-6">
                     <div  id="image" class="form-group">
                         <div class="dropzone single-uploader" id="productImage">
                             <div class="dz-default dz-message">
                                 <img src="{{ @$product ? $image : asset('assets/img/vendors/img-placehollder.png') }}" alt="">
                                 <p class="hint">
                                 </p>
                             </div>
                         </div>
                         <div id="template-preview">
                    <div class="dz-details">
                        <div class="img">
                            <img data-dz-thumbnail />
                            <a data-dz-remove><i class="fas fa-times"></i></a>
                        </div>
                        </p>
                    </div>
                </div>
                     </div>
                     </div>
                     
                     <div class="col-12 col-sm-6">
                     
                         <div id="name" class="form-group">
                             <label class="control-label required"> Product Name</label>
                             <input type="text" class="form-control" name="name" value="{{ @$product ? $product->name : '' }}" placeholder="">
                         </div>
                         <div id="category_id" class="form-group">
                        <label class="control-label required">Category</label>
                        <select name="category_id" class="form-control">
                        @foreach ($categories as $id => $name)
                            <option value="{{$id}}" {{ in_array(@$product->category_id, $categories) ? 'checked' : '' }}>{{$name}}</option>
                            @endforeach
                        </select>
                    </div>

                       
                     </div>
                    
                 </div>

                 <div id="tags" class="form-group">
                    <label class="control-label">
                  Tags
                    </label>
                    <input type="text" name="tags" value="{{ @$product ? $product->tags : '' }}" class="form-control" placeholder="">
                </div>

                 <div id="description" class="form-group">
                     <label class="control-label">
                     Description
                     </label>
                     <textarea name="description" class="form-control" placeholder="">{{ @$product ? $product->description : '' }}</textarea>
                 </div>


                 <div class="btns">
                     <a href="" class="btn btn-empty">Cancel</a>
                     <button id="productButton" class="btn btn-primary spinner-btn">Save</button>
                 </div>
             </form>
         </div>

@endsection

@push('Scripts')
    <script src="{{ asset('assets/js/applicationJs/products.js') }}"></script>
@endpush
