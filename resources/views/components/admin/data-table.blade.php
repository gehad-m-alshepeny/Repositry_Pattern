<!--begin: Datatable-->
<table class="table table-bordered table-hover table-checkable" id="kt_datatable" style="margin-top: 13px !important">
    <thead>
        <tr>
            @foreach($tableConfig['tableHeaderData'] as $tableHeadData)
            <th> {{ $tableHeadData }} </th>
            @endforeach
        </tr>
    </thead>
</table>
<!--end: Datatable-->

<!--========================================================================= -->

@push('Styles')
<link rel="stylesheet" href="{{ asset('admin/assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css') }}" />
<link rel="stylesheet" href="{{ asset('admin/assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}" />
<link rel="stylesheet" href="{{ asset('admin/assets/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}"  />
@endpush

<!--========================================================================= -->
@push('Scripts')
<!--begin::Page Vendors(used by this page)-->
<!-- DataTables  & Plugins -->
<script src="{{asset('assets/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/plugins/jszip/jszip.min.js')}}"></script>
<script src="{{asset('assets/plugins/pdfmake/pdfmake.min.js')}}"></script>
<script src="{{asset('assets/plugins/pdfmake/vfs_fonts.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
<script src="{{asset('assets/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>
<!--end::Page Vendors-->
<!--========================================================================= -->
<script>
    var KTDatatablesDataSourceAjaxServer = function () {

    var initTable1 = function () {
        // var table = $('#kt_datatable');

        // begin first table
        var table = $('#kt_datatable').DataTable({
            responsive: true,
            searchDelay: 500,
            processing: true,
            serverSide: true,
            searching: false,
            pageLength: 25,
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50,100]],
            dom: 'Blfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            "order": [[ {{isset($tableConfig['tableCheckboxs']) ? 1 : 0}}, "desc" ]],
            ajax: {
                url: '{{ $tableConfig['actionUrl'] }}',
                type: 'POST',
                data: {
                    _token:'{{csrf_token()}}',
                    columnsDef: {!! $tableConfig['tableColumnsNames'] !!},
                },
            },
            columns: {!! $tableConfig['tableColumnsData'] !!},


            columnDefs: [
            @if(isset($tableConfig['hasActions']))
                {
                    targets: -1,
                    orderable: false,
                    render: function (data, type, full, meta) {

                        let updateElement = '',
                            deleteElement = '',
                            viewElement = '',
                            customActions = '';

                        if(typeof full.updateLink !== "undefined" && full.updateLink !== "")
                        {
                            updateElement = `<a href="${full.updateLink}" class="btn btn-sm btn-clean btn-icon" title="Edit">
                                              <i class="fa fa-edit"></i>
                                            </a>`;
                        }

                        if(typeof full.deleteLink !== "undefined" && full.deleteLink !== ""){
                            deleteElement = `
                                            <a onclick="(confirm('Are You Sure')) ? document.getElementById('remove-${full.id}').submit() : false;" class="btn btn-sm btn-clean btn-icon" title="Delete">
                                                        <i class="fa fa-trash"></i>
                                            </a>
                                            <form id="remove-${full.id}" action="${full.deleteLink}" method="POST" style="display: none;">
                                                @csrf
                                                @method('delete')
                                            </form>
                                            `;
                        }

                        if(typeof full.viewLink !== "undefined" && full.viewLink !== ""){
                            viewElement = `<a href="${full.viewLink}" target="_blank" class="btn btn-sm btn-clean btn-icon" title="View">
                                              <i class="la la-external-link"></i>
                                            </a>`;
                        }

                       @if (isset($tableConfig['customActions']))

                       let customActionsData = {!! $tableConfig['customActions'] !!};
                        customActionsData.map((data) => {
                          if(typeof full[data.linkColumn] !== "undefined" && full[data.linkColumn] !== ''){
                            customActions +=  `<a href="${full[data.linkColumn]}" ${data.attributes}><i class="${data.icon}"></i></a>`;
                          }
                       });

                       @endif

                        return `
                                ${customActions}
                                ${viewElement}
                                ${updateElement}
                                ${deleteElement}
                               `;
                    },
                },
                @endif
                @if(isset($tableConfig['tableCheckboxs']))
                {
                    targets: 0,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return `<input class="{!! $tableConfig['tableCheckboxs']['checkboxClassName'] !!}" type="checkbox" value="${full.id}">`;
                    },
                },
                @endif

                @if(isset($tableConfig['tableColumnDefs']['link']))
                @foreach($tableConfig['tableColumnDefs']['link'] as $tableConfigData)
                {
                    targets: {!! $tableConfigData['targets'] !!},
                    orderable: {!! $tableConfigData['orderable'] !!},
                    render: function (data, type, full, meta) {

                           let column = "{{ $tableConfigData['column'] }}",
                            columnLink = "{{ $tableConfigData['link'] }}",

                            columnData = (typeof full[column] == "undefined") ? column : full[column],
                            columnLinkData = (columnLink == '#') ? '#' : full[columnLink];

                        return `<a href="${columnLinkData}" target="{!! isset($tableConfigData['target']) ? $tableConfigData['target'] : '_self' !!}">${columnData}</a>`;
                    },
                },
                @endforeach
                @endif

                @if(isset($tableConfig['tableColumnDefs']['image']))
                @foreach($tableConfig['tableColumnDefs']['image'] as $tableConfigData)
                {
                    targets: {!! $tableConfigData['targets'] !!},
                    orderable: {!! $tableConfigData['orderable'] !!},
                    render: function (data, type, full, meta) {
                            let column = "{{ $tableConfigData['column'] }}",
                            columnData = (typeof full[column] == "undefined") ? column : full[column];

                        return (columnData !== '') ?  `<div class="d-flex align-items-center"><div class="symbol symbol-120 mr-3"><img src="${columnData}" /></div></div>` : `-`;
                    },
                },
                @endforeach
                @endif

                @if(isset($tableConfig['tableColumnDefs']['button']))
                @foreach($tableConfig['tableColumnDefs']['button'] as $tableConfigData)
                {
                    targets: {!! $tableConfigData['targets'] !!},
                    orderable: {!! $tableConfigData['orderable'] !!},
                    render: function (data, type, full, meta) {
                        let column = "{{ $tableConfigData['column'] }}",
                            columnLink = "{{ $tableConfigData['link'] }}",

                            columnData = (typeof full[column] == "undefined") ? column : full[column],
                            columnLinkData = (columnLink == '#') ? '#' : full[columnLink];

                        return `<a class="btn btn-primary" href="${columnLinkData}" >${columnData}</a>`;
                    },
                },
                @endforeach
                @endif

                @if(isset($tableConfig['tableColumnDefs']['label']))
                @foreach($tableConfig['tableColumnDefs']['label'] as $tableConfigData)
                {
                    targets: {!! $tableConfigData['targets'] !!},
                    orderable: {!! $tableConfigData['orderable'] !!},
                    render: function (data, type, full, meta) {

                        let statusLabel = {
                            1: ' badge badge-success',
                            2: ' badge badge-danger',
                            3: ' badge badge-primary',
                        };

                        let column = "{{ $tableConfigData['column'] }}",
                            columnLabel = "{{ $tableConfigData['columnLabel'] }}",

                            columnLabelColor = (typeof statusLabel[full[columnLabel]] == "undefined") ? '' : statusLabel[full[columnLabel]];

                        return `<span class="label label-lg font-weight-bold  ${columnLabelColor} label-inline">${full[column]}</span>`;
                    },
                },
                @endforeach
                @endif
            ],

        });

        @if(isset($tableConfig['filter']))
		$('#kt_search').on('click', function(e) {
			e.preventDefault();

        var $formData = $('#filter').serialize();

        table.on('preXhr.dt', function (e, settings, data) {
            return $.extend(data, {filter: $formData});
        });

        table.ajax.reload();
        });
        /*=========================================================================*/
		$('#kt_reset').on('click', function(e) {
            e.preventDefault();
            $('#filter').trigger('reset');
            $('.dropDown').trigger('change');
            table.on('preXhr.dt', function (e, settings, data) {
            return $.extend(data, {filter: ''});
        });
            table.ajax.reload();
		});
        /*=========================================================================*/
        @endif
    };

    return {

        //main function to initiate the module
        init: function () {
            initTable1();
        },

    };

}();

jQuery(document).ready(function () {
    KTDatatablesDataSourceAjaxServer.init();
});
</script>

@if(isset($tableConfig['tableCheckboxs']['delete']))
<script>
    window.onload = function(){

    let dataToSelect = [],
    deleteSelected = $('{!! $tableConfig['tableCheckboxs']['deleteButtonSelector'] !!}');
/*============================================*/
    function deleteSelectedData() {
       let _this = $(this);
       const index = dataToSelect.indexOf(_this.val());
        if (index > -1) {
            dataToSelect.splice(index, 1);
        }else{
            dataToSelect.push(_this.val());
        }
    }

    $(document).on('change','.{!! $tableConfig['tableCheckboxs']['checkboxClassName'] !!}',deleteSelectedData);
/*============================================*/
    function addToDeleteArray(){

       let request = $.ajax({
            url:"{!! $tableConfig['tableCheckboxs']['delete']['deleteUrl'] !!}",
            dataType:'JSON',
            type:'POST',
            data:{
                '_token': '{{csrf_token()}}',
                '_method': 'delete',
                'delid':dataToSelect.join(',')
            }
        });

        request.done(function(){
            window.location.href = "{{ $tableConfig['tableCheckboxs']['delete']['redirectTo'] }}";
        });
   }

   deleteSelected.on('click',addToDeleteArray);
/*============================================*/
};

</script>
@endif

@endpush
