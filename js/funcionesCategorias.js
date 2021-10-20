function consultarCategoriaTodo() {
    $.ajax({
        url: 'http://168.138.144.46:8080/api/Category/all',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta)
            $("#TablaResultadoCategorias").empty();
            $("#TablaResultadoCategorias").append("<tr>");
            $("#TablaResultadoCategorias").append("<th>NOMBRE</th>");
            $("#TablaResultadoCategorias").append("<th>DESCRIPCIÓN</th>");
            $("#TablaResultadoCategorias").append("<th>CABAÑAS</th>");
            $("#TablaResultadoCategorias").append("</tr>");
            for (i = 0; i < respuesta.length; i++) {
                $("#TablaResultadoCategorias").append("<tr>");
                $("#TablaResultadoCategorias").append("<td>" + respuesta[i].name + "</td>");
                $("#TablaResultadoCategorias").append("<td>" + respuesta[i].description + "</td>");
                let caba = " ";
                for (j = 0; j < respuesta[i].cabins.length; j++) {
                    caba += j+1 + ". " + respuesta[i].cabins[j].name + "<br>"
                }
                $("#TablaResultadoCategorias").append("<td>" + caba + "</td>");
                $("#TablaResultadoCategorias").append("</tr>");
            }

        }
    });
}

function guardarCategoria() {
    var datos = {
        name: $('#nombre').val(),
        description: $('#descripcion').val()
    }

    var datosaEnviar = JSON.stringify(datos);

    $.ajax({
        url: 'http://168.138.144.46:8080/api/Category/save',
        data: datosaEnviar,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        complete: function (xhr, status) {
            alert('Categoría Guardada');
            limpiarFormulario();
        }
    });
}

function editarCategoria() {
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

function eliminarCategoria() {
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

function buscarCategoriaId(id) {
    $.ajax({
        url: 'https://g54ed9b48eae3a2-edinsondb.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin/' + id.val(),
        dataType: 'json',
        type: 'GET',
        success: function (json) {
            $("#TablaResultadoCategorias").empty();
            $("#TablaResultadoCategorias").append("<tr>");
            $("#TablaResultadoCategorias").append("<th>ID</th>");
            $("#TablaResultadoCategorias").append("<th>MARCA</th>");
            $("#TablaResultadoCategorias").append("<th>CUARTOS</th>");
            $("#TablaResultadoCategorias").append("<th>CATEGORIA</th>>");
            $("#TablaResultadoCategorias").append("<th>NOMBRE</th>>");
            $("#TablaResultadoCategorias").append("</tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#TablaResultadoCategorias").append("<tr>");
                $("#TablaResultadoCategorias").append("<td>" + json.items[i].id + "</td>");
                $("#TablaResultadoCategorias").append("<td>" + json.items[i].brand + "</td>");
                $("#TablaResultadoCategorias").append("<td>" + json.items[i].rooms + "</td>");
                $("#TablaResultadoCategorias").append("<td>" + json.items[i].category_id + "</td>");
                $("#TablaResultadoCategorias").append("<td>" + json.items[i].name + "</td>");
                $("#TablaResultadoCategorias").append("</tr>");
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
    $("#nombre").val("");
    $("#descripcion").val("");
}


