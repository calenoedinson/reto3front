var actualizarVar = 0;

function consultarClienteTodo() {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Client/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoClientes").empty();
            $("#TablaResultadoClientes").append("<tr>");
            $("#TablaResultadoClientes").append("<th>NOMBRE</th>");
            $("#TablaResultadoClientes").append("<th>CORREO</th>");
            $("#TablaResultadoClientes").append("<th>EDAD</th>");          
            $("#TablaResultadoClientes").append("<th>EDITAR</th>");
            $("#TablaResultadoClientes").append("<th>ELIMINAR</th>");
            $("#TablaResultadoClientes").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoClientes").append("<tr>");
                $("#TablaResultadoClientes").append("<td>" + respuesta[i].name + "</td>");
                $("#TablaResultadoClientes").append("<td>" + respuesta[i].email + "</td>");
                $("#TablaResultadoClientes").append("<td>" + respuesta[i].age + "</td>"); 
                $("#TablaResultadoClientes").append("<td>" + "<input type='button' value='EDITAR' onclick='traeEditarCliente(" + respuesta[i].idClient + ")'>" + "</td>");
                $("#TablaResultadoClientes").append("<td>" + "<input type='button' value='ELIMINAR' onclick='eliminarCliente(" + respuesta[i].idClient + ")'>" + "</td>");   
                $("#TablaResultadoClientes").append("</tr>");
            }

        }
    });
}

function guardarCliente() {
    var datos = {
        name: $("#nombre").val(),
        email: $("#correo").val(),
        age: $('#edad').val(),
        password: $('#contrasena').val()
        
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Client/save',
        data: datosaEnviar,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Cliente guardado');
            limpiarFormulario();
        }
    });
}

function traeEditarCliente(ide) {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Client/' + ide,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            actualizarVar = respuesta.idClient;
            $("#nombre").val(respuesta.name);
            $("#correo").val(respuesta.email);
            $("#edad").val(respuesta.age);
            $("#contrasena").val(respuesta.password);
            $("#guardaCli").prop('disabled', true);
            $("#actualizaCli").prop('disabled', false);
        }
    });
}

function editarCliente() {
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
        url: 'http://168.138.144.46:8080/api/Client/update',
        data: datosaEnviar,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Cabaña Actualizada');
            consultarClienteTodo();
            limpiarFormulario();
        }
    });
}

function eliminarCliente(ide) {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Client/' + ide,
        type: 'DELETE',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            alert('Cabaña Eliminada');
            consultarClienteTodo();
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