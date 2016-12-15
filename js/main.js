$(function () {
    $('#AjaxRequest').submit(function(){

        var formArray = $(this).serializeArray();

        var request;
        request = $.ajax({
            method: "POST",
            url: "post.php",
            data:formArray
        });

        request.done(function(e){
            console.log(e);
        });

        request.fail(function(e){
           console.log(e);
        });

        request.always(function(e){
            console.log(e);
        });

        return false;
    });
});