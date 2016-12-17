$(function () {

    var requestList = $.ajax({
        method:"GET",
        url:"post.php",
        data:{listAll:"list"},
        dataType:"json"
    });

    requestList.done(function(lista) {
        console.log(lista);
        var table= '<thead><tr><th>#</th><th>Nome</th><th>Email</th><th>Telefone</th></tr></thead><tbody>';
        for(var i in lista){
            table += '<tr><th scope="row">'+lista[i].id+'</th>';
            table += '<td>'+lista[i].nome+'</td>';
            table += '<td>'+lista[i].email+'</td>';
            table += '<td>'+lista[i].telefone+'</td></tr>';
        }
        table += '</tbody>';
        $('#contatos').html(table);
    });

    $('#AjaxRequest').submit(function(){

        var form = $(this).serialize();

        var request;
        request = $.ajax({
            method: "POST",
            url: "post.php",
            data:form,
            dataType:"json"
        });

        request.done(function(e){
            $("#msg").html(e.msg);

            if(e.status){
                $('#AjaxRequest').each(function () {
                    this.reset();
                })

                var table = '<tr><th scope="row">'+ e.contato.id+'</th>';
                table += '<td>'+e.contato.nome+'</td>';
                table += '<td>'+e.contato.email+'</td>';
                table += '<td>'+e.contato.telefone+'</td></tr>';
                $('#contatos tbody').prepend(table);
            }
        });

        request.fail(function(e){
            console.log("fail" + e);
        });

        request.always(function () {
            console.log("always");
        });

        return false;
    });
});