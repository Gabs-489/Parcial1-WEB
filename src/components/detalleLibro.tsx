"use client"; 
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ImagenesExternas from "./imagenesExternas";

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
})

interface FormProp{
    idLibro:number,
    name: string,
    isbn: string;
    publishingDate: string, 
    description: string,
    image: string,
}

type Inputs = {
  name: string;
  birthDate: string; 
  description: string;
  image: string;
};

const DetalleLibro = ({idLibro,name,isbn,publishingDate,description,image}:FormProp) => {
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
        const payload = {
            ...data,
            birthDate: new Date(data.birthDate).toISOString()// ejemplo: 18626...
        }
        console.log("Post Login data:", payload)
        console.log("JSON data:", JSON.stringify(payload))
        try{   
            const response = await fetch( `http://127.0.0.1:8080/api/books/${idLibro}` , {
                method: "PUT",
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
                alert("Autor actualizado exitosamente");
                router.push("/authors");

            }


        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div className="p-4 justify-center items-center">
            <div>
                <h1>Nombre libro: {name}</h1>
                <h1>Isbn libro: {isbn}</h1>
                <h1>Descripción libro: {description}</h1>
                <h1>Fecha Publicacion libro: {publishingDate}</h1>
                <ImagenesExternas src={image} alt={name} width={120} height={120} />

            </div>


        </div>
    )
}

export default DetalleLibro;