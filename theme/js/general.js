// general functions for Legion GIS website

function selectNavItem() {
    $(".nav-item").click(function(){
        $(".nav-item").removeClass("active");
        console.log(this);
        $(this).addClass("active");
    });
};

$(document).ready(function() {
    selectNavItem();
}); 