$(document).ready(function() {
    $("#mycarousel").carousel( { interval: 4000 });
});

$(document).ready(function() {
    $('#ConsultingServicesButton').click(function() {
        $('#ApplicationTemplates').collapse("hide");
        $('#CustomApplications').collapse("hide");
        $('#ConsultingServices').collapse('toggle');
         if ($("#csb")[0].style.backgroundColor =='#f4142e') {
            $("#csb")[0].style.backgroundColor = 'florawhite';
         } else {
            $("#csb")[0].style.backgroundColor = '#f4142e';
         }
      });   
    $('#ConsultingServices').on('shown.bs.collapse', function() {
        $('#ConsultingServices').removeClass('collapse');
    });

    $('#ApplicationTemplatesButton').click(function() {
        $('#ConsultingServices').collapse('hide');
        $('#CustomApplications').collapse('hide');
        $('#ApplicationTemplates').collapse('toggle');
        $('#atb')[0].style.backgroundColor = '#f4142e';
      });
    $('#ApplicationTemplates').on('shown.bs.collapse', function() {
        $('#ApplicationTemplates').removeClass('collapse');
    });

    $('#CustomApplicationsButton').click(function() {
        $('#ApplicationTemplates').collapse('hide');
        $('#ConsultingServices ').collapse('hide');
        $('#CustomApplications').collapse('toggle');
        
        $('#cab')[0].style.backgroundColor = '#f4142e';
      });
    $('#CustomApplications').on('shown.bs.collapse', function() {
        $('#CustomApplications').removeClass('collapse');
    });
});

$(document).ready(function() {
    $("#Cardio").hover(function(){
        $("#Cardiotext").css("opacity", "1");
    });
});
