import DetalleLibro from "@/components/detalleLibro";
import FormActualizarAu from "@/components/formActualizarrAu";
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
    console.log(datosAutor)
    const idLibro = Number(id)
    return(
        <div className='p-4 justify-center items-center'>
            <h2 className='text-xl font-bold p-2 pb-4'>Editar Autor</h2>
            <DetalleLibro
                idLibro={idLibro}
                name={datosAutor.name}
                isbn={datosAutor.isbn}
                publishingDate={datosAutor.publishingDate}
                description={datosAutor.description}
                image={datosAutor.image}        
            />
        </div>
    )

}

export default EditarAutor;