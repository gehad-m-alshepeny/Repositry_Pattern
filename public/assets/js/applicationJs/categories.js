"use strict";
var  categoriesTable = "";

/*==================================================================== */
var pluginObject = {
    tableId: "#categoriesTable",
    ajaxUrl: "categories/all",
    columnsData: [
        { data: "id" },
        { data: "status" },
        { data: "name" },
        
    ],
    searchPlaceholder: "search",
    columnDefsArray: [
        {
            targets: "_all",
            orderable: false,
            className: $(window).width() < 576 ? "none" : "",
        },
        {
            targets: 0,
            width: "52px",
            render: function (data, type, full, meta) {
                return `<label class="checkbox_input custom-checkbox custom-checkbox_one" data-id="${full.id}" data-checked-input=""><i class="fas fa-check"></i></label>`;
            },
        },
        {
            targets: 1,
            orderable: true,
            render: function (data, type, full, meta) {
                var statusLabel = {
                    0: "disabled",
                    1: "enabled",
                };
                return `<span class="status-label ${statusLabel[data]}">${full.status_text}</span>`;
            },
        },
        {
            targets: 2,
            render: function (data, type, full, meta) {
                return `${full.name}`;
            },
        },
        
        {
            targets: 3,
            render: function (data, type, full, meta) {
                return ` <a id="deleteBTN"  class="fa fa-trash" data-id="${full.id}" href="categories/destroy"></a>`;
            },
        },
    ],
};
/*==================================================================== */
$(function () {
    if (typeof dataTablePlugin === "function") {
        categoriesTable = dataTablePlugin(pluginObject);
        /*================================================ */
    }

    /*===================================================================== */
    function displayCreateCategory(event) {
        event.preventDefault();
   
        $("#categoryModal").modal("show");

        var request = $.ajax({
            url: $(this).attr("href"),
            type: "GET",
        });

        request.done((response) => {
            $(".modal-body").html(response);
        });
    }

    $(document).on("click", "#createCategoryButton", displayCreateCategory);

    /*============================================================================*/
    function handelCategoryAction(event) {

        event.preventDefault();
        var _this = $(this),
            categoryFormObject = $("#categoryForm");
        _this.prop("disabled", true);

        let ajaxConfigObject = {
            actionUrl: categoryFormObject.attr("action"),
            requestType: "POST",
            requestData: formDataObjectCreator(categoryFormObject),
        };

        let categoryObject = ajaxObjectCaller(ajaxConfigObject);

        categoryObject.always((response) => {
            _this.prop("disabled", false);
        });

        categoryObject.done((response) => {
            $("#categoryModal").modal("hide");
            
            if (typeof categoriesTable == "object") {
                categoriesTable.ajax.reload();
            } else {
                window.location.reload(true);
            }
        });

        categoryObject.fail((response) => {
            defaultErrorHandler(response)
        });

    }

    $(document).on("click", "#categoryButton", handelCategoryAction);
    /*============================================================================*/
    function handelDeleteCategoryAction(event) {
        
        event.preventDefault();

        let _this = $(this),
            categoryId = $(this).attr("data-id");
      
            $('#delete_modal').modal('show');
            $(document).on('click', '#confirmDelete', function() {
                         
            let ajaxConfigObject = {
                actionUrl: _this.attr("href"),
                requestType: "POST",
                contentTypeStatus: "application/json",
                requestData: {
                    _method: 'delete',
                    id: categoryId
                },
            };
            let deleteAreaRequestObject = ajaxObjectCaller(ajaxConfigObject);
            deleteAreaRequestObject.always((response) => {
                _this.prop("disabled", false);
            });

            deleteAreaRequestObject.done((response) => { 
                if(response.data){
                    window.location.href = response.data.redirectTo;
                    }else{
                $('#delete_modal').modal('hide');
                $('#select_all').prop('checked', false);
                categoriesTable.ajax.reload();
                categoryArray = [];
                    }
            });
            });


    }
    $(document).on("click", "#deleteBTN", handelDeleteCategoryAction);
 
     /*============================================================================*/
    
  });
