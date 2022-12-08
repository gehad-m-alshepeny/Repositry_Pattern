@extends('layouts.internal')
@section('title', 'Categories')

@section('content')
    <div class="theme-container">
   
            <div class="btns">
                <a type="button" id="createCategoryButton" class="btn btn-primary" href="">
                    <i class="fas fa-plus mr-2"></i>
                 Add Category
                </a>
            </div>

        </div>
        <table id="categoriesTable" class="table" style="width:100%">
            <thead>
                <tr>
                    <th>
                        <label class="custom-checkbox select_all-checkbox">
                            <input type="checkbox" class="d-none" id="select_all">
                            <i class="fas fa-check"></i>
                            <span class="d-block d-sm-none">Select All</span>
                        </label>
                    </th>
                    <th>
                        <label class="custom-checkbox">
                            <i class="fas fa-check"></i>
                        </label>
                       Status
                    </th>
                    <th>Category Name</th>
                    <th></th>
                   
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <div class="modal fade custom-form-modal delivery-address-modal" id="categoryModal" tabindex="-1" aria-labelledby=""
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-head">
                <p class="title">
                Add Category
                </p>
                <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <form id="categoryForm" action="{{route('categories.store')}}" method="POST">
                @csrf
                <div id="name" class="form-group">
                    <label class="control-label required">Name</label>
                    <div class="with-label">
                        <input type="text" name="name" placeholder="">
                    </div>
                </div>
                <div id="parent_name" class="form-group">
                    <label class="control-label ">Parent Name</label>
                    <div class="with-label">
                        <input type="text" name="parent_name" placeholder="">
                    </div>
                </div>
            
            </form>

            <div class="btns">
                <button class="btn btn-empty pl-0 pr-0" data-dismiss="modal">Cancel</button>
                <button id="categoryButton" class="btn btn-primary spinner-btn">Save</button>
            </div>


        </div>
    </div>
</div>
       
       
    </div>

@endsection

@push('Scripts')
    <script src="{{ asset('assets/js/applicationJs/categories.js') }}"></script>
@endpush
