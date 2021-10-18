function consultarClienteTodo() {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
        type: 'GET',
        dataType: 'json',

        error: function (xhr, status) {
            alert('ha sucedido un problema, ' + xhr.status);
        },
        complete: function (xhr, status) {
            alert('Petición realizada, ' + xhr.status);
        },
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
            console.log(json)
        }
    });
}

function guardarCliente() {
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
    $("#ide").val("");
    $("#nombre").val("");
    $("#correo").val("");
    $("#edad").val("");
}


