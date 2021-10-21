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
                $("#TablaResultadoClientes").append("<td>" + "<input type='button' value='EDITAR' onclick='traeEditarCliente(" + respuesta[i].id + ")'>" + "</td>");
                $("#TablaResultadoClientes").append("<td>" + "<input type='button' value='ELIMINAR' onclick='eliminarCliente(" + respuesta[i].id + ")'>" + "</td>");   
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

function editarCliente() {
    var datos = {
        id: $('#ide').val(),
        name: $("#nombre").val(),
        email: $("#correo").val(),
        age: $('#edad').val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
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

function eliminarCliente() {
    var datos = {
        id: $("#ide").val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
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

function buscarClienteId(id) {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/' + id.val(),
        dataType: 'json',
        type: 'GET',
        success: function (json) {
            $("#TablaResultadoClientes").empty();
            $("#TablaResultadoClientes").append("<tr>");
            $("#TablaResultadoClientes").append("<th>ID</th>");
            $("#TablaResultadoClientes").append("<th>Nombre</th>");
            $("#TablaResultadoClientes").append("<th>Email</th>");
            $("#TablaResultadoClientes").append("<th>Edad</th>>");
            $("#TablaResultadoClientes").append("</tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#TablaResultadoClientes").append("<tr>");
                $("#TablaResultadoClientes").append("<td>" + json.items[i].id + "</td>");
                $("#TablaResultadoClientes").append("<td>" + json.items[i].name + "</td>");
                $("#TablaResultadoClientes").append("<td>" + json.items[i].email + "</td>");
                $("#TablaResultadoClientes").append("<td>" + json.items[i].age + "</td>");
                $("#TablaResultadoClientes").append("</tr>");
            }
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
    $("#nombre").val("");
    $("#correo").val("");
    $("#edad").val("");
    $("#contrasena").val("");
}