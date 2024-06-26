import { getAll, remove, save, selectOne, update, Duplicidad } from "./firestore.js";

let id = '';

document.getElementById('btnSave').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });
    
    if (document.querySelectorAll('.is-invalid').length == 0) {

//verifica si el codigo existe
        const codigo = document.getElementById('codigo').value;
        if (id == '') {
            const codigoExiste = await Duplicidad(codigo);
            if (codigoExiste) {
                Swal.fire({
                    title: "Error",
                    text: "El código que ingresó ya existe,.",
                    icon: "error"
                });
                return;
            }
        }

        const medicamento = {
            codigo,
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            stock: document.getElementById('stock').value,
            fecha: document.getElementById('fecha').value,
            laboratorio: document.getElementById('laboratorio').value,
            tipo: document.getElementById('tipo').value
        };
//almacena un nuevo medicamento
        if (id == '') {
            Swal.fire({
                title: '¿Quieres almacenar el registro?',
                text: 'El registro se almacenará en la base de datos',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: "No Guardar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await save(medicamento);
                    Swal.fire('Guardado!', '', 'success');
                    cargarDatos(); 
                }
            });
        } 
//actualiza los datos de un medicamento ya existente en la base de datos.
        else {
            await update(id, medicamento);
            Swal.fire({
                title: "¡Actualizado!",
                text: "El medicamento ha sido actualizado exitosamente",
                icon: "success"
            })
            cargarDatos()
        }

        limpiar();
        id = '';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});
//carga los datos
function cargarDatos() {
    getAll(datos => {
        let tabla = '';
        datos.forEach(doc => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>${item.precio}</td>
                <td>${item.stock}</td>
                <td>${item.fecha}</td>
                <td>${item.laboratorio}</td>
                <td>${item.tipo}</td>
                <td nowrap>
                    <input type="button" class="btn btn-danger" value="Eliminar" id="${doc.id}">
                    <input type="button" class="btn btn-warning" value="Editar" id="${doc.id}">
                </td>
            </tr>`;
        });

        document.getElementById('contenido').innerHTML = tabla;

        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro de eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await remove(btn.id);
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        });
                        cargarDatos(); 
                    }
                });
            });
        });

        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const med = await selectOne(btn.id);
                const e = med.data();
                document.getElementById('codigo').value = e.codigo;
                document.getElementById('nombre').value = e.nombre;
                document.getElementById('precio').value = e.precio;
                document.getElementById('stock').value = e.stock;
                document.getElementById('fecha').value = e.fecha;
                document.getElementById('laboratorio').value = e.laboratorio;
                document.getElementById('tipo').value = e.tipo;
                document.getElementById('codigo').readOnly = true;
                document.getElementById('btnSave').value = 'Editar';
                id = med.id;
            });
        });
    });
}
