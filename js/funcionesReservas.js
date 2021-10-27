var actualizarVar = 0;

function getDataCabana() {
    $.ajax({
        type: 'GET',
        url: 'http://168.138.144.46:8080/api/Cabin/all',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#cabanaR").empty();
            let miLista = "";
            for (i = 0; i < respuesta.length; i++) {
                miLista += "<option value=" + respuesta[i].id + ">" + respuesta[i].name + "</option>";
            }
            $("#cabanaR").append(miLista);
        }
    });
}

function getDataCliente() {
    $.ajax({
        type: 'GET',
        url: 'http://168.138.144.46:8080/api/Client/all',
        dataType: 'json',
        success: function (respuestaC) {
            console.log(respuestaC)
            $("#clienteR").empty();
            let miLista = "";
            for (i = 0; i < respuestaC.length; i++) {
                miLista += "<option value=" + respuestaC[i].idClient + ">" + respuestaC[i].name + "</option>";
            }
            $("#clienteR").append(miLista);
        }
    });
}

function consultarReservaTodo() {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoReservas").empty();
            $("#TablaResultadoReservas").append("<tr>");
            $("#TablaResultadoReservas").append("<th>N°</th>");
            $("#TablaResultadoReservas").append("<th>CABAÑA</th>");
            $("#TablaResultadoReservas").append("<th>CLIENTE</th>");
            $("#TablaResultadoReservas").append("<th>EMAIL</th>");        
            $("#TablaResultadoReservas").append("<th>EDITAR</th>");
            $("#TablaResultadoReservas").append("<th>ELIMINAR</th>");
            $("#TablaResultadoReservas").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoReservas").append("<tr>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].idReservation + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].cabin.name + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].client.name + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].client.email  + "</td>");
                $("#TablaResultadoReservas").append("<td>" + "<input type='button' value='EDITAR' onclick='traeEditarReserva(" + respuesta[i].idReservation + ")'>" + "</td>");
                $("#TablaResultadoReservas").append("<td>" + "<input type='button' value='ELIMINAR' onclick='eliminarReserva(" + respuesta[i].idReservation + ")'>" + "</td>"); 
                $("#TablaResultadoReservas").append("</tr>");
            }
        }
    });
}

function guardarReserva() {
    var datos = {
        startDate: $('#fecha_i').val(),
        devolutionDate: $("#fecha_e").val(),
        cabin: { id: $('#cabanaR').val() },
        client: { idClient: $('#clienteR').val() }
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/save',
        data: datosaEnviar,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Reserva guardada');
            limpiarFormulario();
        }
    });
}

function traeEditarReserva(ide) {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/' + ide,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            actualizarVar = respuesta.idReservation;
            $("#cabanaR").val(respuesta.cabin.id);
            $("#clienteR").val(respuesta.client.idClient);
            $("#fecha_i").val(respuesta.startDate);
            $("#fecha_e").val(respuesta.devolutionDate);
            $("#guardaRes").prop('disabled', true);
            $("#actualizaRes").prop('disabled', false);
        }
    });
}

function editarReserva() {
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
            consultarReservaTodo();
            limpiarFormulario();
        }
    });
}

function eliminarReserva(ide) {

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Cabin/' + ide,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Cabaña Eliminada');
            consultarCabanaTodo();
            limpiarFormulario();
        }
    });
}

function limpiarFormulario() {
    $("#nombre").val("");
    $("#marca").val("");
    $("#cuartos").val("");
    $("#descripcion").val("");
    $("#categoria").val(1);
    $("#guardaCab").prop('disabled', false);
    $("#actualizaCab").prop('disabled', true);
}


