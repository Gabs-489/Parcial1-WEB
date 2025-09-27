"use client"; 
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1,"El nombre es obligatorio"),
    source: z.string(),
    description: z.string().min(1,"La descripción es obligatoria").max(255, "La descripción no puede tener más de 255 caracteres"),
})

interface FormProps {
    idLibro:number
}

type Inputs = {
  name: string;
  source: string; 
  description: string;
};

const FormResenia = ({idLibro}:FormProps) =>{
  const router = useRouter();

  const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema), 
    })

    
    const onSubmit = async (data: Inputs) => {
        console.log("Login data:", data)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const payload = {
            ...data,
        }
        try{   
            const response = await fetch( `${apiUrl}/api/books/${idLibro}/reviews` , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const responseText = await response.text();
                console.log("Response error:", responseText);
            }else{
                const result = await response.json();
                console.log("Respuesta del servidor:", result);
                alert("Reseña creada exitosamente");
                router.push(`/books/${idLibro}`);

            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto p-4 border border-gray-300 rounded">

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>Nombre:</label>
                    <input type='text' {...register("name")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='source'>Source:</label>
                    <input type='text' {...register("source")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>}
                </div>

                <div className="mb-4">
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='description'>Description:</label>
                    <input type='text' {...register("description")} className='w-full p-2 border border-gray-300 rounded' />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Crear Reseña</button>

        </form>
      </div>

    )

}

export default FormResenia;
