"use strict";

function modalComponent(modalConfig) {

    var modalSizeClass = (modalConfig.modalSizeClass !== undefined) ? modalConfig.modalSizeClass : "modal-xl";

    return `
    <div class="modal fade custom-form-modal" data-backdrop="static" id="${modalConfig.modalId}" style="display: none;" tabindex="-1" aria-labelledby="address_tableModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered ${modalSizeClass}">
            <div class="modal-content">
                <div class="modal-head">
                    <p class="title">
                        ${(typeof modalConfig.modalTitle !== "undefined" && modalConfig.modalTitle.length > 0) ? modalConfig.modalTitle : ''}
                    </p>
                    <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body p-0">
                ${modalConfig.modalContent}
                </div>
            </div>
        </div>
    </div>
    `;
}

