const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    if (input.value.trim() == '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio.</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id == 'precio' || id == 'stock') {
            validarNoNegativos(input);
        }
        if (id == 'fecha') {
            const dia = validarFecha(input.value);
            if (dia <= 0) {
                input.classList.add('is-invalid');
                div.innerHTML = '<span class="badge bg-danger">La fecha de vencimiento debe ser futura.</span>';
            }
        }
    }
}

const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        document.getElementById('e-' + item.name).innerHTML = '';
    });
    document.getElementById('btnSave').value = 'Guardar';
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true;
    return false;
}

const validarNoNegativos = (input) => {
    const div = document.getElementById('e-' + input.id);
    if (input.value < 0) {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El valor no puede ser negativo.</span>';
    } else {
        input.classList.remove('is-invalid');
        div.innerHTML = '';
    }
}

const validarFecha = (fecha) => {
    const hoy = new Date();
    fecha = new Date(fecha);
    const resta = fecha - hoy;
    const dia = resta / (1000 * 60 * 60 * 24);

    return dia.toFixed(0);
}


