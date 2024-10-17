// $(document).ready(function () {
//     // Función para cargar la vista correspondiente
//     function cargarVista(view) {
//         $('#view-container').load(view + '.html');
//     }

//     // Manejador de clic en los botones
//     $('.myButton').click(function () {
//         var view = $(this).data('view');
//         cargarVista(view);
//     });

//     // Cargar vista por defecto (Inicio)
//     cargarVista('inicio');
// });
// $(document).ready(function () {
//     // Función para cargar la vista correspondiente
//     function cargarVista(view) {
//         // Primero intenta cargar desde la carpeta 'views', si no, carga desde la raíz
//         $('#view-container').load('views/' + view + '.html', function (response, status, xhr) {
//             if (status === "error") {
//                 // Si no encuentra en la carpeta 'views', busca en la raíz
//                 $('#view-container').load(view + '.html', function (response, status, xhr) {
//                     if (status === "error") {
//                         // Si tampoco lo encuentra en la raíz, muestra un mensaje de error
//                         $('#view-container').html('<h2>Error: Vista no encontrada</h2>');
//                     }
//                 });
//             }
//         });
//     }

//     // Manejador de clic en los botones
//     $('.myButton').click(function () {
//         var view = $(this).data('view');
//         cargarVista(view);
//     });

//     // Cargar vista por defecto (Inicio)
//     cargarVista('inicio');
// });

$(document).ready(function () {
    // Función para cargar la vista correspondiente
    function cargarVista(view) {
        // Intenta cargar la vista desde la carpeta 'views' primero
        let url = 'views/' + view + '.html';

        // Cargar la vista y manejar el error si no se encuentra
        $('#view-container').load(url, function (response, status) {
            if (status === "error") {
                // Si no encuentra la vista en 'views', intenta desde la raíz
                console.warn('Vista no encontrada en la carpeta views/, buscando en el directorio raíz.');
                $('#view-container').load(view + '.html', function (response, status) {
                    if (status === "error") {
                        // Mostrar mensaje de error si tampoco se encuentra en la raíz
                        console.error('Vista no encontrada en el directorio raíz.');
                        $('#view-container').html('<h2>Error: Vista no encontrada</h2>');
                    }
                });
            }
        });
    }

    // Manejador de clic en los botones
    $('.myButton').click(function () {
        var view = $(this).data('view');
        cargarVista(view);
    });

    // Cargar vista por defecto (Inicio)
    cargarVista('usuario');
});
