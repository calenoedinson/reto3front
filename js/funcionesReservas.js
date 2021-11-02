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
    let fechaI = "";
    let fechaE = "";
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoReservas").empty();
            $("#TablaResultadoReservas").append("<tr>");
            $("#TablaResultadoReservas").append("<th>N° RESERVA</th>");
            $("#TablaResultadoReservas").append("<th>CABAÑA</th>");
            $("#TablaResultadoReservas").append("<th>CLIENTE</th>");
            $("#TablaResultadoReservas").append("<th>EMAIL</th>");
            $("#TablaResultadoReservas").append("<th>FECHA INICIO</th>");
            $("#TablaResultadoReservas").append("<th>FECHA ENTREGA</th>");
            $("#TablaResultadoReservas").append("<th>STATUS</th>");
            $("#TablaResultadoReservas").append("<th>ESTADO ACTUAL</th>");
            $("#TablaResultadoReservas").append("<th>EDITAR</th>");
            $("#TablaResultadoReservas").append("<th>ELIMINAR</th>");
            $("#TablaResultadoReservas").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoReservas").append("<tr>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].idReservation + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].cabin.name + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].client.name + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].client.email + "</td>");
                for (let index = 0; index < 10; index++) {
                    fechaI += respuesta[i].startDate[index];
                    fechaE += respuesta[i].devolutionDate[index];
                }
                $("#TablaResultadoReservas").append("<td>" + fechaI + "</td>");
                $("#TablaResultadoReservas").append("<td>" + fechaE + "</td>");
                $("#TablaResultadoReservas").append("<td>" + respuesta[i].status + "</td>");
                $("#TablaResultadoReservas").append("<td>" + "<input type='button' value='COMPLETADO' onclick='actualizarEstadoCompletado(" + respuesta[i].idReservation + ")'>" + "<input type='button' value='CANCELADO' onclick='actualizarEstadoCancelado(" + respuesta[i].idReservation + ")'>" + "</td>");
                $("#TablaResultadoReservas").append("<td>" + "<input type='button' value='EDITAR' onclick='traeEditarReserva(" + respuesta[i].idReservation + ")'>" + "</td>");
                $("#TablaResultadoReservas").append("<td>" + "<input type='button' value='ELIMINAR' onclick='eliminarReserva(" + respuesta[i].idReservation + ")'>" + "</td>");
                $("#TablaResultadoReservas").append("</tr>");
                fechaI = "";
                fechaE = "";
            }
        }
    });
}

function guardarReserva() {
    if ($('#fecha_i').val().trim() == "" || $('#fecha_e').val().trim() == "" || $('#fecha_i').val() > $('#fecha_e').val()) {
        alert('Rango de fechas de reserva incorrecto, por favor verifique');
    } else {
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
}

function traeEditarReserva(ide) {
    let fechaI = "";
    let fechaE = "";
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/' + ide,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            actualizarVar = respuesta.idReservation;
            $("#cabanaR").val(respuesta.cabin.id);
            $("#clienteR").val(respuesta.client.idClient);
            for (let index = 0; index < 10; index++) {
                fechaI += respuesta.startDate[index];
                fechaE += respuesta.devolutionDate[index];
            }
            $("#fecha_i").val(fechaI);
            $("#fecha_e").val(fechaE);
            $("#guardaRes").prop('disabled', true);
            $("#actualizaRes").prop('disabled', false);
        }
    });

}

function actualizarEstadoCompletado(ide) {
    var datos = {
        idReservation: ide,
        status: 'completed'
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/update',
        data: datosaEnviar,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Estado Actualizado');
            consultarReservaTodo();
        }
    });
}

function actualizarEstadoCancelado(ide) {
    let estado="cancelled";
    var datos = {
        idReservation: ide,
        status: estado
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/update',
        data: datosaEnviar,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Estado Actualizado');
            consultarReservaTodo();
        }
    });
}

function editarReserva() {
    if ($('#fecha_i').val().trim() == "" || $('#fecha_e').val().trim() == "" || $('#fecha_i').val() > $('#fecha_e').val()) {
        alert('Rango de fechas de reserva incorrecto, por favor verifique');
    } else {
        var datos = {
            idReservation: actualizarVar,
            startDate: $('#fecha_i').val(),
            devolutionDate: $("#fecha_e").val(),
            cabin: { id: $('#cabanaR').val() },
            client: { idClient: $('#clienteR').val() },
        }

        var datosaEnviar = JSON.stringify(datos);

        $.ajax({
            url: 'http://168.138.144.46:8080/api/Reservation/update',
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
}

function eliminarReserva(ide) {

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/' + ide,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Reserva eliminada');
            consultarReservaTodo();
            limpiarFormulario();
        }
    });
}

function consultarCantidadReserva(fechaI, fechaF, estadoR) {
    let estado = estadoR;
    let contador = 0;
    if (estado == "all") {
        $.ajax({
            url: 'http://168.138.144.46:8080/api/Reservation/report-dates/' + fechaI + "/" + fechaF,
            type: 'GET',
            dataType: 'json',
            success: function (respuesta) {
                for (i = 0; i < respuesta.length; i++) {
                    contador += 1;
                }
            }
        });
        $("#TotalCantidad").val(contador);
    } else if (estado == "completed") {

    } else if (estado == "cancelled") {

    }
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Reservation/report-dates/' + fechaI + "/" + fechaF,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            for (i = 0; i < respuesta.length; i++) {
                contador += 1;
            }
        }
    });
    $("#TotalCantidad").val(contador);
}

function limpiarFormulario() {
    $("#fecha_i").val("");
    $("#fecha_e").val("");
    $("#cabanaR").val();
    $("#clienteR").val();
    $("#guardaRes").prop('disabled', false);
    $("#actualizaRes").prop('disabled', true);
}


