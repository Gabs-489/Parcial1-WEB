import FormActualizarAu from "@/app/components/formActualizarrAu";
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

const EditarAutor = async ({ params }: Params) => {
    const { id } = await params;

    const respuesta = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method:"GET",
        cache: "no-store", 
    });

    if (!respuesta.ok) {
        return notFound(); 
    }

    const datosAutor = await respuesta.json()
    const idAutor = Number(id)
    return(
        <div className='p-4 justify-center items-center'>
            <h2 className='text-xl font-bold p-2 pb-4'>Editar Autor</h2>
            <FormActualizarAu
                idAutor={idAutor}
                name={datosAutor.name}
                birthDate={datosAutor.birthDate}
                description={datosAutor.description}
                image={datosAutor.image}        
            />
        </div>
    )

}

export default EditarAutor;