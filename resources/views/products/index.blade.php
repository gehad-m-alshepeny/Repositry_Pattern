@extends('layouts.internal')
@section('title', 'Products')

@section('content')
    <div class="theme-container">
   
            <div class="btns">
                <a type="button" class="btn btn-primary" href="{{route('products.create')}}">
                    <i class="fas fa-plus mr-2"></i>
                 Add Product
                </a>
            </div>

        </div>
        <table id="productsTable" class="table" style="width:100%">
            <thead>
                <tr>
                    <th>
                        <label class="custom-checkbox select_all-checkbox">
                            <input type="checkbox" class="d-none checklist" id="select_all">
                            <i class="fas fa-check"></i>
                            <span class="d-block d-sm-none">@lang('common.selectAll')</span>
                        </label>
                    </th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
       
       
    </div>

@endsection

@push('Scripts')
    <script src="{{ asset('assets/js/applicationJs/products.js') }}"></script>
@endpush
