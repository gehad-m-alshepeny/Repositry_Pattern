"use strict";
const DROPDOWN_CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');

function staticDropdown(componentConfig) {
    $(`${componentConfig.selector}`).select2({
        minimumResultsForSearch: "20",
        width: "100%",
        dropdownParent: $(`${componentConfig.modalId}`),
    });
}

function dynamicDropDown(componentConfig) {

    let dropdownTemplate = (componentConfig.customTemplate !== undefined && typeof componentConfig.customTemplate == "function") ? componentConfig.customTemplate : defualtDropdownTemplate;

    $(`${componentConfig.selector}`).select2({
        minimumResultsForSearch: "20",
        width: "100%",
        placeholder: `${componentConfig.placeholder}`,
        dropdownParent: $(`${componentConfig.dropdownParent}`),
        templateResult: dropdownTemplate,
        ajax: {
            url: `${componentConfig.actionUrl}`,
            type: "post",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                let data = {
                    _token: DROPDOWN_CSRF_TOKEN,
                    search: params.term // search term
                };
                // here you can set any of data to send it in ajax request
                if (typeof componentConfig.transformAjaxData === "function") {
                    data = componentConfig.transformAjaxData(data);
                }
                
                return data;
            },
            processResults: function (response) {
                return {
                    results: response
                };
            },
            cache: true
        }
    });
}

function defualtDropdownTemplate(data) {
    let optionElement = $(`<option value="${data.id}">${data.text}</option>`);
    return optionElement;
}
