import './asyncModules'
import exclaimify from './exclaimify'


//
// Accordion
//
function accordionTabs(target) {
 $(target).each(function(index) {
    $(this).children('li').first().next().children('a').addClass('is-active').next().addClass('is-open').show()
  })
  $(target).on('click', 'li > a.tab-link', function(event) {
    event.preventDefault()

    if (!$(this).hasClass('is-active')) {
      var accordionTabs = $(this).closest('.accordion-tabs')
      accordionTabs.find('.is-open').removeClass('is-open').hide()

      $(this).next().toggleClass('is-open').toggle()
      accordionTabs.find('.is-active').removeClass('is-active')
      $(this).addClass('is-active')
    }
  })
}


//
// Dropdown
//
const dropdown = function() {

}



//
// Navigation
//
const navToggle = function(target, toggleBtn) {
  // Toggle menu
  $(toggleBtn).click(function(e) {
    e.stopPropagation() // prevents document.click from firing
    $(target).toggle('fast')
    $(target).toggleClass('is-open')
  })

  // Hide menu if anywhere is clicked
  $(document).click(function() {
    if ($(target).hasClass('is-open')){
      $(target).slideUp('fast')
    }
  })
}



//
// Video Modal
//
const videoModal = function() {
  let $videoBtn = $('[data-video]'),
      $videoSrc = $videoBtn.attr('data-video')

  $videoBtn.click(function() {
      alert($videoSrc)
  })
}

//
// Active Page Link
//
// Make sure the current page is marked
const activePageLink = function(target) {
  $(target).each(function() {
    if (window.location.pathname.split('/')[1] == $(this).children('a').attr('href')) {
      $(this).addClass("is-active")
    }
  })
}


//
// Application "Controller"
//
const ROLAIDS = {
  common: {
    init: function() {
      accordionTabs('.accordion-tabs')
      navToggle('#app_nav', '.nav-toggle')
      activePageLink('.nav__list-item')

      $('.nav-dropdown__subtitle').click(function() {
        console.log('test')
        $('.nav-dropdown__submenu').removeClass('is-active')
        $(this).parent('.nav-dropdown__submenu').addClass('is-active')
      })
    },
    show: function() {
    }
  },

  home: {
    init: function() {
      videoModal()
    },

    show: function() {
      // Prevent video loading before carousel is done
      var $gallery = $('.flickity').flickity({
        autoPlay: 5000
      });

      function onLoadeddata( event ) {
        var cell = $gallery.flickity( 'getParentCell', event.target );
        $gallery.flickity( 'cellSizeChange', cell && cell.element );
      }

      $gallery.find('video').each( function( i, video ) {
        video.play();
        $( video ).on( 'loadeddata', onLoadeddata );
      });

    }
  }
}


//
// Utility functions
//
const UTIL = {
  exec: function( controller, action ) {
    var ns = ROLAIDS,
        action = ( action === undefined ) ? "init" : action

    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]()
    }
  },

  init: function() {
    var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" )

    UTIL.exec( "common" )
    UTIL.exec( controller )
    UTIL.exec( controller, action )
  }
}


//
// Initialize
//
document.addEventListener('DOMContentLoaded', function() {
  UTIL.init()
}, false)
