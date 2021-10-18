function getDataReserva() {
    $.ajax({
        type: 'GET',
        url: 'http://168.138.144.46:8080/api/Reservation/all',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#reserva").empty();
            let miLista = "";
            for (i = 0; i < respuesta.length; i++) {
                miLista += "<option value=" + respuesta[i].idReservation + ">" + respuesta[i].idReservation + "</option>";
            }
            $("#reserva").append(miLista);
        }
    });
}

function consultarCalificacionTodo() {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Score/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoCalificaciones").empty();
            $("#TablaResultadoCalificaciones").append("<tr>");
            $("#TablaResultadoCalificaciones").append("<th>N°</th>");
            $("#TablaResultadoCalificaciones").append("<th>RESERVA</th>");
            $("#TablaResultadoCalificaciones").append("<th>MENSAJE</th>");
            $("#TablaResultadoCalificaciones").append("<th>PUNTUACIÓN</th>");
            $("#TablaResultadoCalificaciones").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoCalificaciones").append("<tr>");
                $("#TablaResultadoCalificaciones").append("<td>" + respuesta[i].id + "</td>");
                $("#TablaResultadoCalificaciones").append("<td>" + respuesta[i].vr_reserva + "</td>");
                $("#TablaResultadoCalificaciones").append("<td>" + respuesta[i].vr_mensaje + "</td>");
                $("#TablaResultadoCalificaciones").append("<td>" + respuesta[i].puntuacion+ "</td>");                
                $("#TablaResultadoCalificaciones").append("</tr>");
            }

        }
    });
}


function consultarCabanaTodo() {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin',
        type: 'GET',
        dataType: 'json',
        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
        success: function (json) {
            $("#TablaResultadoCabanas").empty();
            $("#TablaResultadoCabanas").append("<tr>");
            $("#TablaResultadoCabanas").append("<th>ID</th>");
            $("#TablaResultadoCabanas").append("<th>MARCA</th>");
            $("#TablaResultadoCabanas").append("<th>CUARTOS</th>");
            $("#TablaResultadoCabanas").append("<th>CATEGORIA</th>>");
            $("#TablaResultadoCabanas").append("<th>NOMBRE</th>>");
            $("#TablaResultadoCabanas").append("</tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#TablaResultadoCabanas").append("<tr>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].id + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].brand + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].rooms + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].category_id + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].name + "</td>");
                $("#TablaResultadoCabanas").append("</tr>");
            }
            console.log(json)
        }
    });
}

function guardarCabana() {
    var datos = {
        id: $('#ide').val(),
        brand: $('#marca').val(),
        rooms: $('#cuartos').val(),
        category_id: $('#categoria').val(),
        name: $('#nombre').val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin',
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

function editarCabana() {
    var datos = {
        id: $('#ide').val(),
        brand: $('#marca').val(),
        rooms: $('#cuartos').val(),
        category_id: $('#categoria').val(),
        name: $('#nombre').val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin',
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

function eliminarCabana() {
    var datos = {
        id: $("#ide").val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin',
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

function buscarCabanaId(id) {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin/' + id.val(),
        dataType: 'json',
        type: 'GET',
        success: function (json) {
            $("#TablaResultadoCabanas").empty();
            $("#TablaResultadoCabanas").append("<tr>");
            $("#TablaResultadoCabanas").append("<th>ID</th>");
            $("#TablaResultadoCabanas").append("<th>MARCA</th>");
            $("#TablaResultadoCabanas").append("<th>CUARTOS</th>");
            $("#TablaResultadoCabanas").append("<th>CATEGORIA</th>>");
            $("#TablaResultadoCabanas").append("<th>NOMBRE</th>>");
            $("#TablaResultadoCabanas").append("</tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#TablaResultadoCabanas").append("<tr>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].id + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].brand + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].rooms + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].category_id + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + json.items[i].name + "</td>");
                $("#TablaResultadoCabanas").append("</tr>");
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
    $("#marca").val("");
    $("#cuartos").val("");
    $("#categoria").val("");
    $("#nombre").val("");
}


