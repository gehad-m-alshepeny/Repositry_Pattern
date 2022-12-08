"use strict";

function dataTablePlugin(pluginObject) {
    var table = $(`${pluginObject.tableId}`).DataTable({
        searchDelay: 500,
        rowId: function(row) {
            return `${pluginObject.tableId.replace('#', '')}_${row.id}`
          },
        processing: true,
        serverSide: true,
        ajax: {
            url: pluginObject.ajaxUrl,
            type: "POST",
            data: {
                _token: $("meta[name='csrf-token']").attr("content"),
            },
        },
        columns: pluginObject.columnsData,
        select: {
            selector: "td:first-child",
            style: "multi",
        },
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: "column",
                target: ".s",
            },
        },
        bLengthChange: false,
        bInfo: false,
        language: {
            search: "",
            searchPlaceholder: pluginObject.searchPlaceholder,
            paginate: {
                previous: `<i class="fas fa-angle-left rotate-ar"></i>`,
                next: `<i class="fas fa-angle-right rotate-ar"></i>`,
            },
        },
        columnDefs: [
            ...pluginObject.columnDefsArray,
            {
                targets: "_all",
                orderable: false,
                className: $(window).width() < 576 ? "none" : "",
            },
        ],
    });

    table.on('select deselect search.dt draw', function (e, objDT, type, indexes) {
        if (table.rows('.selected').any()) {
            const rowsCount = table.rows().count()
            const selectedRowsCount = table.rows('.selected').count()
            if(rowsCount == selectedRowsCount) {
                $("#select_all + i").removeClass('fa-minus min').addClass('fa-check')
            } else {
                $("#select_all + i").removeClass('fa-check').addClass('fa-minus min')
            }

            $("#select_all").prop('checked', true);
            $(".dt-btn").removeClass('disabled');
        } else {
            $("#select_all").prop('checked', false);
            $(".dt-btn").addClass('disabled');
        }
    });
    /*================================================================== */
    $('.dataTables_filter > label > input[type="search"]').addClass(
        "form-control"
    );

    /*================================================================== */
    function selectAllCheckboxes(checkbox) {
        $(this).is(":checked")
            ? table.rows().select()
            : table.rows().deselect();
            $.each($(".checkbox_input"), function () {
            ($(this).attr("data-checked-input") == "checked") ? 
            $(this).attr("data-checked-input", "") : 
            $(this).attr("data-checked-input", "checked");
            });

    }
    $(document).on("change", "#select_all", selectAllCheckboxes);

    /*================================================================== */
    function customCheckboxAction() {
        $(this).parents("tr").prev().find("td:first-child").trigger("click");
    }

    $(document).on(
        "click",
        ".dataTable .dtr-details .custom-checkbox i",
        customCheckboxAction
    );
    /*================================================================== */
    return table;
}

/*================================================================================ */
function addCheckedLabelAction() { 

    ($(this).find('.custom-checkbox_one').attr("data-checked-input") == "checked") ? $(this).find('.custom-checkbox_one').attr("data-checked-input", "") : $(this).find('.custom-checkbox_one').attr("data-checked-input", "checked");
}
  $(document).on("click", ".sorting_1", addCheckedLabelAction)

/*================================================================================ */
function dataTableStatic(selector) {

    var staticTable = $(`${selector}`).DataTable({
        select: {
            selector: "td:first-child",
            style: "multi",
        },
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: "column",
                target: ".s",
            },
        },
        bLengthChange: false,
        searching: false,
        bInfo: false,
        language: {
            search: "",
            searchPlaceholder: "Search For area Name…",
            paginate: {
                previous: '<i class="fas fa-angle-left rotate-ar"></i>',
                next: '<i class="fas fa-angle-right rotate-ar"></i>',
            },
        },
        columnDefs: [
            {
                targets: "_all",
                orderable: false,
                className: $(window).width() < 576 ? "none" : "",
            },
        ],
    });

    return staticTable;
}
/*================================================================================ */
function appendButtons(datatableBtns) {
    $('<div class="dt-btns"></div>').prependTo(".dataTables_filter");
    $.each(datatableBtns, function (_, el) {
        var btn = "";
        btn += `<a class="dt-btn ${el.classes}" id="${el.id}" ${el.attr}>`;
        if (el.image) {
            btn += `<img src="${el.image}"/>`;
        } else {
            btn += `<i class="${el.icon}"></i>`;
        }
        
        el.tooltip && (btn += `<span class="dt-tooltip ${el.tooltip.placement}"> ${el.tooltip.title || el.tooltip} </span>`)

        btn += `</a>`;
        $(".dataTables_filter .dt-btns").append(btn);
    });
}

function dataTableSelectedIds(table_id) {
    let selectedIds = [];

    $.each($("#" + table_id + " .custom-checkbox"), function () {
        var status = $(this).attr("data-checked-input"),
            id = $(this).attr("data-id");
        if (status == "checked") {
            selectedIds.push(id);
        }
    });
    
    return selectedIds;
}

$(document).on('click', '.dt-btn', function(e) {
    e.preventDefault()
    e.stopPropagation()
})
/*================================================================================ */
