Template.mainLayout.rendered = function(){
    if(!Meteor.userId()){FlowRouter.go('/login');}

    
    // Minimalize menu when screen is less than 768px
    $(window).bind("resize load", function () {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    });

    // Fix height of layout when resize, scroll and load
    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {

            var navbarHeight = $('nav.navbar-default').height();
            var wrapperHeight = $('#page-wrapper').height();

            if(navbarHeight > wrapperHeight){
                $('#page-wrapper').css("min-height", navbarHeight + "px");
            }

            if(navbarHeight < wrapperHeight){
                $('#page-wrapper').css("min-height", $(window).height()  + "px");
            }

            if ($('body').hasClass('fixed-nav')) {
                if (navbarHeight > wrapperHeight) {
                    $('#page-wrapper').css("min-height", navbarHeight  + "px");
                } else {
                    $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
                }
            }
        }
    });

    // SKIN OPTIONS
    // Uncomment this if you want to have different skin option:
    // Available skin: (skin-1 or skin-3, skin-2 deprecated, md-skin)
    // $('body').addClass('md-skin');

     // FIXED-SIDEBAR
    // Uncomment this if you want to have fixed left navigation
    $('body').addClass('fixed-sidebar');
    $('.sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });
};

Template.mainLayout.helpers({
    customerDetails: function(){return Session.get('customerDetails');},
    isLive : function(){return Session.get('isLive');}    
});
    