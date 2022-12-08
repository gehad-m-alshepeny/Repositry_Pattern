const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};

const appendUploadedFile = (file, parent, fileName, multiple) => {
    if(!file.type.includes("image")) {
        return;
    }
    !multiple && parent.find(".preview").remove();
    parent.find(".placeholder").addClass("d-none");

    let fileInput = $(`<input type="file" class="d-none" name="${fileName}${multiple ? "[]" : ""}">`);
    
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.get(0).files = dataTransfer.files;

    const id = fileName + uniqueId();

    let box = `
        <span class="preview" id="${id}">
            <img src="${URL.createObjectURL(file)}">
            <button class="remove" type="button">
                <i class="fas fa-times"></i>
            </button>
            
        </span>`;

    parent.append(box);
    $("#" + id).append(fileInput);
};

// change event
$(".custom-img-upload .upload-input").change(function (event) {
    const parent = $(this).siblings(".img");
    const fileName = $(this).data("name");

    appendUploadedFile(event.target.files[0], parent, fileName);
    $(this).val("");
});

// remove uploaded image
$(".custom-img-upload").on("click", ".remove", function () {
    $(this)
        .parents(".custom-img-upload")
        .find(".placeholder")
        .removeClass("d-none");
    $(this).parents(".preview").remove();
});

// drag and drop events
$(".custom-img-upload").on("dragenter", function (ev) {
    // Entering drop area. Highlight area
    $(this).addClass("highlightDropArea");
});

$(".custom-img-upload").on("dragleave", function (ev) {
    // Going out of drop area. Remove Highlight
    $(this).removeClass("highlightDropArea");
});

$(".custom-img-upload").on("drop", function (ev) {
    // Dropping files
    ev.preventDefault();
    ev.stopPropagation();
    // Clear previous messages
    if (ev.originalEvent.dataTransfer) {
        if (ev.originalEvent.dataTransfer.files.length) {
            var droppedFile = ev.originalEvent.dataTransfer.files[0];
            const parent = $(this).find(".img");
            const fileName = $(this).find(".upload-input").data("name");

            appendUploadedFile(droppedFile, parent, fileName);
        }
    }

    $(this).removeClass("highlightDropArea");
    return false;
});

$(".custom-img-upload").on("dragover", function (e) {
    e.preventDefault();
});

// ***Here is the code for converting "image source" (url) to "Base64".***

const toBase64 = (url) =>
    fetch(url)
        .then((response) => response.blob())
        .then(
            (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                })
        );

// ***Here is code for converting "Base64" to javascript "File Object".***

function dataURLtoFile(base64, filename) {
    var arr = base64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

const renderUploadedImages = (id, url) => {

    // *** Calling both function ***

    toBase64(url).then((base64) => {
        const fileName = url.substring(url.lastIndexOf("/") + 1);
        var fileData = dataURLtoFile(base64, fileName);

        const parent = $("#" + id).siblings(".img");

        appendUploadedFile(fileData, parent, id);
    });
};

const runUploadedImages = (id, images) => {
    for (var i = 0; i < images.length; i++) {
        renderUploadedImages(id, images[i]);
    }
};
