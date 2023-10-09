import { useNavigate, Form, useActionData } from 'react-router-dom';
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { agregarCliente } from '../data/Clientes';

export async function action({ request }) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get('email');
  
    // Validación
    const errores = [];
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    // Validación de email más simple (esto puede ser mejorado)
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        errores.push('El email no es válido');
    }

    if (errores.length) {
        return errores;
    }

    await agregarCliente(datos);
    return null;
}

function NuevoCliente() {
    const errores = useActionData();
    const navigate = useNavigate();
  
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>
            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-lg"
                    onClick={() => navigate("-1")}
                >
                    Volver
                </button>
            </div>
            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10'>
                {errores?.length > 0 && errores.map((error, i) => <Error key={i}>{error}</Error>)}
                <Form method='post' noValidate>
                    <Formulario />
                    <input
                        type="submit"
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-lg hover:bg-blue-900'
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    );
}

export default NuevoCliente;
