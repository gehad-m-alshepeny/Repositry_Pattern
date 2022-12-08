$(document).ready(function () {
  "use strict";
  const inputs = document.querySelectorAll(".verify-code input");
  inputs.forEach((input, key) => {
    input.addEventListener("keyup", function () {
      if (input.value) {
        if (key === $(inputs).length - 1) {
          const userCode = [...inputs].map((input) => input.value).join("");
          inputs[key].maxLength = 1;
        } else {
          inputs[key + 1].focus();
        }
      }
    });
  });

  
  (function ($) {
    $.fn.inputFilter = function (inputFilter) {
      return this.on(
        "input keydown keyup mousedown mouseup select contextmenu drop",
        function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = "";
          }
        }
      );
    };
  })(jQuery);

  $(document).ready(function () {
    $(".verify-input").inputFilter(function (value) {
      return /^\d*$/.test(value); // Allow digits only, using a RegExp
    });
  });

  // test
  $(document).on('keydown', ".verify-code input", function() {
    $(this).val('')
  })
});
