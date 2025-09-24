"use client"; 

import React from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string().min(1,"El nombre es obligatorio"),
    birthDate: z.string().min(1).refine( (val) => {
        const date = new Date (val);
        return date < new Date();
    },
    {
        message: "La fecha de nacimiento debe ser del pasado"
    }),
    description: z.string().min(1,"La descripción es obligatoria").max(255, "La descripción no puede tener más de 255 caracteres"),
    image: z.url("La imagen debe ser una URL válida"),
    nameBook: z.string().min(1,"El nombre del libro es obligatorio."),
    isbn: z.string().min(1,"El ISBN del libro es obligatorio."),
    imageBook: z.url("La imagen del libro debe ser una URL válida"),
    publishingDate: z.string().min(1).refine( (val) => {
        const date = new Date (val);
        return date < new Date();
    },
    {
        message: "La fecha de publicación debe ser del pasado"
    }),
    descriptionBook: z.string().min(1,"La descripción es obligatoria").max(255, "La descripción no puede tener más de 255 caracteres"),
    premiationDate: z.string().min(1).refine( (val) => {
        const date = new Date (val);
        return date < new Date();
    },
    {
        message: "La fecha de premiación debe ser del pasado"
    }),
    namePrice: z.string().min(1,"El nombre del premio es obligatorio."),
    descrptionPrice: z.string().min(1,"La descripción es obligatoria").max(255, "La descripción no puede tener más de 255 caracteres"),

})

type Inputs = {
  name: string;
  birthDate: string; 
  description: string;
  image: string;   
  nameBook: string;
  isbn: string;
  imageBook: string;
  publishingDate: string;
  descriptionBook: string;
  premiationDate: string;
  namePrice: string;
  descrptionPrice: string;
};

const FormCrearAu = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema), 
    })

    const onSubmit = async (data: Inputs) => {
        console.log("Login data:", data)
        const payloadAutor = {
            name : data.name,
            birthDate: new Date(data.birthDate).toISOString(),// ejemplo: 18626...
            description: data.description,
            image : data.image
        }

        const payloadBook = {
            name : data.nameBook,
            isbn : data.isbn,
            publishingDate: new Date(data.publishingDate).toISOString(),// ejemplo: 18626...
            description: data.descriptionBook,
            image : data.imageBook,
            editorial: {"id":1000,"name":"BLOOMSBURY"}
        }

        const payloadPremio = {
            name : data.namePrice,
            premiationDate: new Date(data.premiationDate).toISOString(),// ejemplo: 18626...
            description: data.descrptionPrice,
            organization: {"id":1000,"name":"org1","tipo":"PUBLICA"}
        }


        try{   

            const book = await fetch("http://127.0.0.1:8080/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payloadBook)
            });

            console.log(book);

            if (!book.ok) throw new Error("Error creando libro");
            const bookInfo = await book.json();


            const autor = await fetch( "http://127.0.0.1:8080/api/authors" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payloadAutor)
            });

            if (!autor.ok) throw new Error("Error creando autor");
            const autorInfo = await autor.json();

            await fetch(
                `http://127.0.0.1:8080/api/authors/${autorInfo.id}/books/${bookInfo.id}`,
                { method: "POST" }
            );

            const prize = await fetch( "http://127.0.0.1:8080/api/prizes" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payloadPremio)
            });

            if (!prize.ok) throw new Error("Error creando premio");
            const prizeInfo = await prize.json();

            await fetch(
                `http://127.0.0.1:8080/api/prizes/${prizeInfo.id}/author/${autorInfo.id}`,
                { method: "POST" }
            );

        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div className="p-4 justify-center items-center">

            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto p-4 border border-gray-300 rounded">
                <h1>Autor: </h1>
                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>Nombre:</label>
                    <input type='text' {...register("name")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='birthDate'>Fecha de Nacimiento:</label>
                    <input type='date' {...register("birthDate")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
                </div>
                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='description'>Descripción:</label>
                    <textarea  {...register("description")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='image'>Imagen (URL):</label>
                    <input type='text' {...register("image")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>
                <h1>Libro: </h1>
                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>Nombre del Libro:</label>
                    <input type='text' {...register("nameBook")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.nameBook && <p className="text-red-500 text-sm mt-1">{errors.nameBook.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>ISBN del Libro:</label>
                    <input type='text' {...register("isbn")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='image'>Imagen del libro (URL):</label>
                    <input type='text' {...register("imageBook")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.imageBook && <p className="text-red-500 text-sm mt-1">{errors.imageBook.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='birthDate'>Fecha de Publicación:</label>
                    <input type='date' {...register("publishingDate")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.publishingDate && <p className="text-red-500 text-sm mt-1">{errors.publishingDate.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='descriptionBook'>Descripción del Libro:</label>
                    <textarea  {...register("descriptionBook")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.descriptionBook && <p className="text-red-500 text-sm mt-1">{errors.descriptionBook.message}</p>}
                </div>
                <h1>Premio: </h1>
                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='namePrice'>Nombre del Premio:</label>
                    <input type='text' {...register("namePrice")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.namePrice && <p className="text-red-500 text-sm mt-1">{errors.namePrice.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='premiationDate'>Fecha de Premiación:</label>
                    <input type='date' {...register("premiationDate")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.premiationDate && <p className="text-red-500 text-sm mt-1">{errors.premiationDate.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='descrptionPrice'>Descripción del Premio:</label>
                    <textarea  {...register("descrptionPrice")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.descrptionPrice && <p className="text-red-500 text-sm mt-1">{errors.descrptionPrice.message}</p>}
                </div>

                <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Crear Autor</button>
            </form>
        </div>
    )
}

export default FormCrearAu;