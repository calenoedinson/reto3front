function consultarMensajeTodo() {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'GET',
        dataType: 'json',

        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
        success: function (json) {
            $("#TablaResultadoMensajes").empty();
            $("#TablaResultadoMensajes").append("<tr>");
            $("#TablaResultadoMensajes").append("<th>ID</th>");
            $("#TablaResultadoMensajes").append("<th>MENSAJE</th>");
            $("#TablaResultadoMensajes").append("</tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#TablaResultadoMensajes").append("<tr>");
                $("#TablaResultadoMensajes").append("<td>" + json.items[i].id + "</td>");
                $("#TablaResultadoMensajes").append("<td>" + json.items[i].messagetext + "</td>");
                $("#TablaResultadoMensajes").append("</tr>");
            }
            console.log(json)
        }
    });
}

function guardarMensaje() {
    var datos = {
        id: $('#ide').val(),
        messagetext: $("#mensaje").val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        data: datosaEnviar,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Petición realizada ' + xhr.status);
            limpiarFormulario();
        }
    });
}

function editarMensaje() {
    var datos = {
        id: $('#ide').val(),
        messagetext: $("#mensaje").val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        data: datosaEnviar,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Petición realizada ' + xhr.status);
            limpiarFormulario();
        }
    });
}

function eliminarMensaje() {
    var datos = {
        id: $("#ide").val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
        data: datosaEnviar,
        type: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada ' + xhr.status);
            limpiarFormulario();
        }
    });
}

function buscarMensajeId(id) {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/' + id.val(),
        dataType: 'json',
        type: 'GET',
        success: function (json) {
            $("#TablaResultadoMensajes").empty();
            $("#TablaResultadoMensajes").append("<tr>");
            $("#TablaResultadoMensajes").append("<th>ID</th>");
            $("#TablaResultadoMensajes").append("<th>MENSAJE</th>");
            $("#TablaResultadoMensajes").append("</tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#TablaResultadoMensajes").append("<tr>");
                $("#TablaResultadoMensajes").append("<td>" + json.items[i].id + "</td>");
                $("#TablaResultadoMensajes").append("<td>" + json.items[i].messagetext + "</td>");
                $("#TablaResultadoMensajes").append("</tr>");
            }
            console.log(json)
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada ' + xhr.status);
        }
    });
}

function limpiarFormulario() {
    $("#ide").val("");
    $("#mensaje").val("");
}



