"use client"; 
import React from "react";
import ImagenesExternas from "./imagenesExternas";
import  { useState } from 'react';
import FormResenia from "./formCrearResenia";



interface Review {
    id: number,
    name: string,
    source: string,
    description:string,
}

interface FormProp{
    idLibro:number,
    name: string,
    isbn: string;
    publishingDate: string, 
    description: string,
    image: string,
    reviews: Review[]
}



const DetalleLibro = ({idLibro,name,isbn,publishingDate,description,image,reviews}:FormProp) => {

    const[agregarResenia, setAgregarResenia] = useState(false)


    return (
        <div className="p-4 justify-center items-center flex flex-col">
            <div>
                <h1 className="py-4 text-lg font-bold" >Nombre libro: </h1> <p>{name}</p>
                <h1 className="py-4 text-lg font-bold" >Isbn libro: </h1> <p>{isbn}</p>
                <h1 className="py-4 text-lg font-bold" >Descripción libro: </h1> <p>{description}</p>
                <h1 className="py-4 text-lg font-bold" >Fecha Publicacion libro: </h1> <p>{publishingDate}</p>
                <div className="py-4">
                    <ImagenesExternas src={image} alt={name} width={120} height={120} />
                </div>
                <h1 className="py-4 font-bold">Reseñas:</h1>
                <div>
                    {reviews.map((r)=>(
                        <div className="p-4 border-b border-gray-300" key={r.id}>
                            <h3>Nombre: {r.name}</h3>
                            <p>Descripcion: {r.description}</p>
                            {r.source?.trim() !== "" && <p>Source: {r.source}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-8">

                {!agregarResenia && 
                    <button className="border p-2 bg-blue-500 text-white px-4 rounded" onClick={()=>setAgregarResenia(true)}>
                        Agregar Reseña
                    </button>
                }
                
                {agregarResenia && 
                    <>
                    <button className="border p-2 bg-red-500 text-white px-4 rounded" onClick={() => setAgregarResenia(false)}>
                        Cancelar
                    </button>
                    <FormResenia
                            idLibro={idLibro} /></>
                
                }
            </div>
        </div>
    )
}

export default DetalleLibro;