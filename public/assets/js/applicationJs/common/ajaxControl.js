"use strict";

function formDataObjectCreator(formObject) {
    var formDataObject = new FormData(formObject[0]);
    return formDataObject;
}
/*========================================================================== */
function defaultErrorHandler(response, show_error_msg = true) {
    var errorMessages = response.responseJSON.errors;

    $(`.has-err`).removeClass("has-err");
    $(`.control-err`).remove();

    $.each(errorMessages, (key, val) => {
        let element = $(document.getElementById(`${key}`))
            .addClass("has-err");
        show_error_msg && (element.append(`<span class="control-err">${Array.isArray(val) ? val[0] : val}</span>`));
    });
}

/*========================================================================== */
function ajaxObjectCaller(ajaxConfigObject) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var contentTypeStatus = (typeof ajaxConfigObject.contentTypeStatus !== undefined) ? true : false;

    let ajaxConfig = {
        url: ajaxConfigObject.actionUrl,    
        type: ajaxConfigObject.requestType,                                                                               
        dataType: "JSON",
        enctype: "multipart/form-data",
        data: ajaxConfigObject.requestData,    
    };

    if (typeof ajaxConfigObject.contentTypeStatus == "undefined" || typeof ajaxConfigObject.contentTypeStatus == undefined) {
        ajaxConfig['contentType'] = false;
        ajaxConfig['processData'] = false;
    }

    let requestObject = $.ajax(ajaxConfig);
    
    requestObject.done((response) => {
        $(`.has-err`).removeClass("has-err");
        $(`.control-err`).remove();
    });

    return requestObject;
}
/*========================================================================== */


function submitFormWithCallback($form, theSuccessCallback, theErrorCallback) {
    let xhrInstance = ajaxObjectCaller({
        actionUrl: $form.attr("action"),
        requestType: $form.attr("method") || "POST",
        requestData: formDataObjectCreator($form),
    });

    xhrInstance.always((response) => {
        $form.find(".load-over").removeClass("load-over");
    });

    xhrInstance.done((response) => {
        $form.find(`.has-err`).removeClass("has-err");
        $form.find(`.control-err`).remove();
        typeof theSuccessCallback === "function" && theSuccessCallback(response);
    });

    xhrInstance.fail((response) => {
        defaultErrorHandler(response);
        typeof theErrorCallback === "function" && theErrorCallback(response)
    });
    
    return xhrInstance;
};
