"use strict";


var  productsTable = "";

var prevTemplate = $('#template-preview').html();
$('#template-preview').remove();
$("#productImage").dropzone({
    url: "#",
    previewTemplate: prevTemplate,
    thumbnailWidth: null,
    thumbnailHeight: null,
    maxFiles: 1,
    init: function () {
        this.on("maxfilesexceeded", function (file) {
            this.removeAllFiles();
            this.addFile(file);
        });
    }
}); 
 
/*==================================================================== */
var pluginObject = {
    tableId: "#productsTable",
    ajaxUrl: "products/all",
    columnsData: [
        { data: "id" },
        { data: "image" },
        { data: "name" },
        { data: "category" },
     
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
            render: function (data, type, full, meta) {
                return `<img src="${full.image}" alt="" class="dt-img">`;
                
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
                return `${full.category}`;
            },
        },
        {
            targets: 4,
            render: function (data, type, full, meta) {
                return `<a  class="fa fa-edit" data-name="${full.name}" href="products/edit/${full.id}"></a>
                <a id="deleteBTN"  class="fa fa-trash" data-id="${full.id}" href="products/destroy"></a>`;
            },
        },
        
    ],
};
/*==================================================================== */
$(function () {
    if (typeof dataTablePlugin === "function") {
        productsTable = dataTablePlugin(pluginObject);

    }

    /*============================================================================*/

    function handelProductAction(event) {
        
        event.preventDefault();
      
        var _this = $(this),
        productFormObject = $("#productForm"),
        formDataObject = formDataObjectCreator(productFormObject);

        _this.prop("disabled", true);

        let uploadedItem = $("#productImage")[0].dropzone.getAcceptedFiles()[0];

        (typeof uploadedItem == undefined || typeof uploadedItem == "undefined") ? "" : formDataObject.append("productImage", uploadedItem);
        
       
        let ajaxConfigObject = {
            actionUrl: productFormObject.attr("action"),
            requestType: "POST",
            requestData: formDataObject,
        };
          
        let productObject = ajaxObjectCaller(ajaxConfigObject);

        productObject.always((response) => {
            _this.prop("disabled", false);
        });

        productObject.done((response) => {

            window.location.href = response.data.redirectTo;
        });

        productObject.fail((response) => { 
            defaultErrorHandler(response)
        });

    }

    $(document).on("click", "#productButton", handelProductAction);
   

    /*============================================================================*/
    function handelDeleteCategoryAction(event) {
        
        event.preventDefault();

        let _this = $(this),
            id = $(this).attr("data-id");
      
            $('#delete_modal').modal('show');
            $(document).on('click', '#confirmDelete', function() {
                         
            let ajaxConfigObject = {
                actionUrl: _this.attr("href"),
                requestType: "POST",
                contentTypeStatus: "application/json",
                requestData: {
                    _method: 'delete',
                    id: id
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
                productsTable.ajax.reload();
                    }
            });
            });


    }
    $(document).on("click", "#deleteBTN", handelDeleteCategoryAction);
    /*=============================================== */
   
  });
  
   
  /*============================================================================*/
  
