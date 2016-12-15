$(function () {
    $('#AjaxRequest').submit(function(){
        var request;
        request = $.ajax({
            method: "POST",
            url: "post.php",
            data:{
                nome: $(':input[name=nome]').val(),
                email: $(':input[name=email]').val(),
                telefone: $(':input[name=telefone]').val()
            }
        });

        request.always(function(e){
            console.log(e);
        });

        return false;
    });
});