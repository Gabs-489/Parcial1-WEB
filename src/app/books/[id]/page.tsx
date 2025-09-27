import DetalleLibro from "@/components/detalleLibro";
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

const EditarAutor = async ({ params }: Params) => {
    const { id } =  params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    const respuesta = await fetch(`${apiUrl}/api/books/${id}`, {
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
                reviews = {datosAutor.reviews}     
            />
        </div>
    )

}

export default EditarAutor;