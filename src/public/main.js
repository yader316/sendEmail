const expresiones={
    usuario:/^[a-zA-Z0-9\_\-]{4,16}$/,// Letras,numeros,guionyguion_bajo
    nombre:/^[a-zA-ZA-ÿ\s]{1,40}$/,// Letrasyespacios,pueden llevar acentos.
    password:/^.{4,12}$/,//4a12 digitos.
    correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono:/^\d{7,14}$/ //7a14 numeros.
}
const formulario = document.getElementsByTagName('formContent')[0];

formulario.innerHTML = `
        <div class="formContent">
            <h1 class="formContent__titulo">Formulario</h1>
            <div class="formContent__container">
                <form>

                    <div class="formContent__nameContent">
                        <input type="text" name="name" class="formContent__name form-control" placeholder="Name" autofocus required>
                        <input type="text" name="lastName" class="formContent__lastName form-control" placeholder="Last Name" required>
                    </div>

                    <div class="formContent__emailPhone">
                        <input type="text" name="email" placeholder="Email" class="formContent__email form-control" required>
                        <input type="number" name="phone" placeholder="Phone" class="formContent__phone form-control" required>
                    </div>

                    <div class="formContent__addressContent">
                        <input type="text" name="address" placeholder="Address" class="formContent__address form-control" required>
                    </div>

                    <div class="formContent__menuContent">
                        <select name="services" class="formContent__menu form-control">
                            <option selected value="Type You Services You Need">Type You Services You Need</option>
                            <option value="services 1">Services 1</option>
                            <option value="services 2">Services 2</option>
                            <option value="services 3">Services 3</option>
                        </select>
                    </div>

                    <div class="formContent__checkContent">
                        <p>Best Way To Contact You</p>
                        <div class="formContent__check">
                            <div class="formContent__checkOpt">
                                <input type="checkbox" class="form-check-input" name="phoneCheck" value="Phone">
                                <label class="form-check-label" for="phoneCheck">Phone</label>
                            </div>
                            <div class="formContent__checkOpt">
                                <input type="checkbox" class="form-check-input" name="emailCheck" value="Email">
                                <label class="form-check-label" for="emailCheck">Email</label>
                            </div>
                        </div>
                    </div>

                    <div class="formContent__menssageContent">
                        <textarea name="message"  placeholder="Message" class="formContent__messages form-control"  required></textarea>
                    </div>

                    <button class="formContent__btn" id="send">
                        Send A Message
                    </button>

                </form>
            </div>
        </div>
`;



document.getElementById('send').addEventListener('click', (e) => {

    e.preventDefault();

    const datos = {};
    const inputs = document.querySelectorAll('formContent input');
    const servicesItems = document.querySelectorAll('formContent select');
    const checkBox = document.querySelectorAll('formContent__checkOpt input');
    const textarea = document.querySelector('formContent textarea');

    inputs.forEach(input => {
        datos[input.name] = input.value;
    });

    servicesItems.forEach(services => {
        datos[services.name] = services.value;
    });
    checkBox.forEach(check => {
        datos[check.name] = check.checked;
    });

    datos['message'] = textarea.value;
    datos.correo = document.querySelector('formContent').getAttribute('data-correo');

    console.log(datos);

    // axios.post('/send-email', datos)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    var respuesta = confirm('¿Estas seguro de enviar el correo?');

    if (respuesta) {

        fetch('/send-email', {
            method: 'POST', body: JSON.stringify(datos), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(function (response) {
            if (response.status === 200) {
                alert('mensaje enviado');
                inputs.forEach(input => {
                    input.value = '';
                })
                textarea.value = '';
            } else {
                alert('mensaje no enviado');
            }
        })
        .catch(function (error) {
            alert('mensaje no enviado');
        });
    }
    else {
        return false;
    }
})