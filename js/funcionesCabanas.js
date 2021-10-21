var actualizarVar = 0;

function getDataCategoria() {
    $.ajax({
        type: 'GET',
        url: 'http://168.138.144.46:8080/api/Category/all',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#categoria").empty();
            let miLista = "";
            for (i = 0; i < respuesta.length; i++) {
                miLista += "<option value=" + respuesta[i].id + ">" + respuesta[i].name + "</option>";
            }
            $("#categoria").append(miLista);
        }
    });
}

function consultarCabanaTodo() {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Cabin/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoCabanas").empty();
            $("#TablaResultadoCabanas").append("<tr>");
            $("#TablaResultadoCabanas").append("<th>NOMBRE</th>");
            $("#TablaResultadoCabanas").append("<th>MARCA</th>");
            $("#TablaResultadoCabanas").append("<th>CUARTOS</th>");
            $("#TablaResultadoCabanas").append("<th>CATEGORIA</th>");
            $("#TablaResultadoCabanas").append("<th>DESCRIPCIÓN</th>");
            $("#TablaResultadoCabanas").append("<th>EDITAR</th>");
            $("#TablaResultadoCabanas").append("<th>ELIMINAR</th>");
            $("#TablaResultadoCabanas").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoCabanas").append("<tr>");
                $("#TablaResultadoCabanas").append("<td>" + respuesta[i].name + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + respuesta[i].brand + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + respuesta[i].rooms + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + respuesta[i].category.name + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + respuesta[i].description + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + "<input type='button' value='EDITAR' onclick='traeEditarCabana(" + respuesta[i].id + ")'>" + "</td>");
                $("#TablaResultadoCabanas").append("<td>" + "<input type='button' value='ELIMINAR' onclick='eliminarCabana(" + respuesta[i].id + ")'>" + "</td>");
                $("#TablaResultadoCabanas").append("</tr>");
            }
        }
    });
}

function guardarCabana() {
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

function traeEditarCabana(ide) {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Cabin/' + ide,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            actualizarVar = respuesta.id;
            $("#nombre").val(respuesta.name);
            $("#marca").val(respuesta.brand);
            $("#cuartos").val(respuesta.rooms);
            $("#descripcion").val(respuesta.description);
            $("#categoria").val(respuesta.category.id);
            $("#guardaCab").prop('disabled', true);
            $("#actualizaCab").prop('disabled', false);
        }
    });
}

function editarCabana() {
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

function eliminarCabana(ide) {
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

function limpiarFormulario() {
    $("#nombre").val("");
    $("#marca").val("");
    $("#cuartos").val("");
    $("#descripcion").val("");
    $("#categoria").val(1);
    $("#guardaCab").prop('disabled', false);
    $("#actualizaCab").prop('disabled', true);
}