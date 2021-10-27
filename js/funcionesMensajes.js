var actualizarVar = 0;

function getDataCabana() {
    $.ajax({
        type: 'GET',
        url: 'http://168.138.144.46:8080/api/Cabin/all',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#cabanaM").empty();
            let miLista = "";
            for (i = 0; i < respuesta.length; i++) {
                miLista += "<option value=" + respuesta[i].id + ">" + respuesta[i].name + "</option>";
            }
            $("#cabanaM").append(miLista);
        }
    });
}

function getDataCliente() {
    $.ajax({
        type: 'GET',
        url: 'http://168.138.144.46:8080/api/Client/all',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#clienteM").empty();
            let miLista = "";
            for (i = 0; i < respuesta.length; i++) {
                miLista += "<option value=" + respuesta[i].idClient + ">" + respuesta[i].name + "</option>";
            }
            $("#clienteM").append(miLista);
        }
    });
}

function consultarMensajeTodo() {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Message/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoMensajes").empty();
            $("#TablaResultadoMensajes").append("<tr>");
            $("#TablaResultadoMensajes").append("<th>MENSAJE</th>");
            $("#TablaResultadoMensajes").append("<th>CABAÑA</th>");
            $("#TablaResultadoMensajes").append("<th>CLIENTE</th>");
            $("#TablaResultadoMensajes").append("<th>EDITAR</th>");
            $("#TablaResultadoMensajes").append("<th>ELIMINAR</th>");
            $("#TablaResultadoMensajes").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoMensajes").append("<tr>");
                $("#TablaResultadoMensajes").append("<td>" + respuesta[i].messageText + "</td>");
                $("#TablaResultadoMensajes").append("<td>" + respuesta[i].cabin.name + "</td>");
                $("#TablaResultadoMensajes").append("<td>" + respuesta[i].client.name + "</td>");
                $("#TablaResultadoMensajes").append("<td>" + "<input type='button' value='EDITAR' onclick='traeEditarMensaje(" + respuesta[i].idMessage + ")'>" + "</td>");
                $("#TablaResultadoMensajes").append("<td>" + "<input type='button' value='ELIMINAR' onclick='eliminarMensaje(" + respuesta[i].idMessage + ")'>" + "</td>"); 
                $("#TablaResultadoMensajes").append("</tr>");
            }

        }
    });
}


/*function guardarMensaje() {
    var datos = {
        name: $('#nombre').val(),
        brand: $('#marca').val(),
        rooms: $('#cuartos').val(),
        description: $('#descripcion').val(),
        category: { id: $('#categoria').val() }
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Cabin/save',
        data: datosaEnviar,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Cabaña Guardada');
            limpiarFormulario();
            consultarCabanaTodo();
        }
    });
}
*/

function traeEditarMensaje(ide) {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Message/' + ide,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            actualizarVar = respuesta.id; //necesita verificar ID desde NetBeans
            $("#cabanaM").val(respuesta.cabin.id);
            $("#clienteM").val(respuesta.client.idClient);
            $("#mensajeM").val(respuesta.messageText);
            //$("#descripcion").val(respuesta.description);// se elimina
            //$("#categoria").val(respuesta.category.id);// se elimina
            $("#guardaMen").prop('disabled', true);
            $("#actualizaMen").prop('disabled', false);
        }
    });
}//Terminado.

/*function editarMensaje() {
    var datos = {
        id: actualizarVar,
        name: $('#nombre').val(),
        brand: $('#marca').val(),
        rooms: $('#cuartos').val(),
        description: $('#descripcion').val(),
        category: { id: $('#categoria').val() }
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Cabin/update',
        data: datosaEnviar,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Cabaña Actualizada');
            consultarCabanaTodo();
            limpiarFormulario();
        }
    });
}
*/
function eliminarMensaje(ide) {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Cabin/' + ide,
        type: 'DELETE',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            alert('Cabaña Eliminada');
            consultarCabanaTodo();
        }
    });
}

/*function limpiarFormulario() {
    $("#nombre").val("");
    $("#marca").val("");
    $("#cuartos").val("");
    $("#descripcion").val("");
    $("#categoria").val(1);
    $("#guardaCab").prop('disabled', false);
    $("#actualizaCab").prop('disabled', true);
}
*/


function guardarMensaje() {
    var datos = {
        messageText: $("#mensajeM").val(),
        client: { idClient: $('#clienteM').val() },
        cabin: { id: $('#cabanaM').val() }
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Message/save',
        data: datosaEnviar,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Mensaje Guardado');
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
    $("#cabanaM").val(1);
    $("#clienteM").val(1);
    $("#mensajeM").val("");
}