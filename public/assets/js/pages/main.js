Dropzone.autoDiscover = false;


$(document).ready(function () {
   "use strict"

   // page head responsive subtitle tooltip
   $('.responsive-tooltip').tooltip()

   // loading btn
   $('.spinner-btn').click(function () {
      $(this).addClass('load-over')
   })
   $('.spinner-btn.load-over').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
   })
   $(document).ajaxStop(function () {
      $('.spinner-btn').removeClass('load-over')
   });

   // sidebar collapse
   $('.sidebar .collapse-btn').click(function () {
      $('.page-wrapper').toggleClass('sidebar-collapsed')
      if($('.page-wrapper').is('.sidebar-collapsed')) {
         $(".sidebar-content").css('overflow', 'visible');
      } else {
         $(".sidebar-content").css('overflow', 'auto');
      }
   })

   // sidebar responsive toggler
   $('.sidebar-toggler').click(function () {
      $('.sidebar').toggleClass('show')
      $('.sidebar-overlay').toggleClass('show')
      $(this).toggleClass('active')
   })

   // collapse submenus in sidebar
   $('.sidebar .with-sub-menu.open .sub-menu').slideDown(0)
   $('.sidebar .with-sub-menu > a').click(function (e) {
      e.preventDefault()
      if (!$('.page-wrapper').is('.sidebar-collapsed')) {
         $(this).parent().toggleClass('open')
         $(this).siblings('.sub-menu').stop().slideToggle()
         $(this).parent().siblings('.with-sub-menu').find('.sub-menu').stop().slideUp()
      }
      calcSidebarDropdownPosition()

   });

   $('.sidebar .with-sub-menu > a').hover(function() {
      calcSidebarDropdownPosition()
   })

   const calcSidebarDropdownPosition = () => {
      $(':not(sidebar-collapsed) .sidebar .with-sub-menu .sub-menu').css({
         transform: `translate(100%, 0% )`
      })
      $(':not(sidebar-collapsed) .sidebar .with-sub-menu .sub-menu').each(function(_, el) {
         const offsetBottom = $(el).offset().top + $(el).height()
         const windowHeight = $(window).height()
         if(offsetBottom > windowHeight) {
            $(el).css({
               transform: `translate(100%, ${windowHeight - offsetBottom}px )`
            })
         }
      })
   }

   // list items collapse
   $(document).on('click', '.items-box .list-item .item-head', function () {
      $(this).toggleClass('active')
      $(this).siblings('.item-body').toggleClass('active').stop().slideToggle()
   });

   // delete item
   $(document).on('click', '.items-box .list-item .delete-item', function () {
      if ($(this).parents('.items-area').find('.list-item').length == 1) {
         $(this).parents('.items-area').find('.empty-state').removeClass('d-none')
      }

      $(this).parents('.list-item').remove()
   });

   // selected items collapse (insert items modal)
   $('.insert-list-modal .selected-list .head').click(function () {
      $(this).toggleClass('active')
      $(this).siblings('.body').slideToggle()
   });


   // password toggle
    $(document).on('click', '.password-wrapper i', function () {
      $(this).toggleClass('active');
      if ($(this).is('.active')) {
         $(this).siblings('input').attr('type', 'text')
      } else {
         $(this).siblings('input').attr('type', 'password')
      }
   });

    function unsecuredCopyToClipboard(text) {
       const textArea = document.createElement("textarea");
       textArea.value = text;
       document.body.appendChild(textArea);
       textArea.focus();
        textArea.select();
       try {
           document.execCommand("copy");
       } catch (err) {
           console.error("Unable to copy to clipboard", err);
       }
        document.body.removeChild(textArea);
   }
    
   // copy text 
    $(document).on('click', '.form-group .copy-link .copy', function () {
        const theText = $(this).siblings('.link').text();
        
        try {
            navigator.clipboard.writeText(theText);
        } catch (error) {
            unsecuredCopyToClipboard(theText);
        }

      $(this).find('.copied').css({
         opacity: 1,
         visibility: "visible"
      });
      setTimeout(() => {
         $(this).find('.copied').css({
            opacity: 0,
            visibility: "hidden"
         });
      }, 1000);
   })
    
    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find(`.has-err`).removeClass("has-err");
    });

    // target switch
    $(document).on('change', '[data-toggle="target_switch"]', function() {
       const targetEl = $(this).data('target')
       console.log(targetEl, $(this).is(':checked'), $(targetEl))
      $(this).is(':checked') ? $(targetEl).addClass('show') : $(targetEl).removeClass('show')
    })

})
