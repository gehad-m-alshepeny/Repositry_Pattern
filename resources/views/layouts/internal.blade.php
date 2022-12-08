@extends('layouts.app')

@section('pageContent')
    <section class="page-wrapper">
        <x-admin.application-menu />
        <div class="content-wrapper">
            @yield('content')
        </div>
    </section>
     <!-- delete modal -->
     <div class="modal fade confirm-modal" id="delete_modal" tabindex="-1" aria-labelledby="address_tableModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-head">
                    <p class="title">
                        <span class="badge-icon badge-icon-danger mr"><i class="far fa-trash-alt"></i></span>
                        <span class="model-header">Delete</span>
                    </p>
                    <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="desc">
                
                    <span class="bold">
                  Are you Sure you want to delete this item?
                    </span>
                </p>
                <div class="btns">
                    <button class="btn btn-empty" data-dismiss="modal" aria-label="Close">
                   Cancel
                    </button>
                    <button id="confirmDelete" class="btn btn-danger-dark spinner-btn">
                    Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
     
  

@endsection
@push('Scripts')
  
    
<script>
        function handelLogoutAction(event) {
        event.preventDefault();

        $("#logoutForm").submit();
    }
    $(document).on("click", "#logoutButton", handelLogoutAction);
</script>

@endpush
