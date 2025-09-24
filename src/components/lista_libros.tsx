"use client"; 
import React, { useState, useEffect } from 'react';
import ImagenesExternas from './imagenesExternas';
import Link from "next/link";


interface Editorial {
    id: number;
    name: string;
}
interface Book{
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial;
}

const ListaLibros = () => {
    const [libros, setLibros] = useState<Book[]>([]);
    const [update,setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLibros = async () =>{
            try {
                const response = await fetch("http://127.0.0.1:8080/api/books", {
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error('Error en la conexión con la API');
                }
                const data = await response.json();
                setLibros(data);
            } catch (error) {
                console.log(error);
                setError(
                    "No se pudieron cargar los servicios. Por favor, intente más tarde."
                );
            } finally {
                setIsLoading(false);
            } 
        }
        fetchLibros();
    }, [update]);


    if (isLoading) {
    return <div className="text-center p-8">
            <h1 className='font-bold text-xl'>
                Cargando libros...
            </h1>
        </div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 justify-center items-center">
            <h2 className='text-xl font-bold p-2 pb-4'>Lista de libros</h2>
        

            <div className='overflow-x-auto mb-4 w-[80rem] mx-auto'>
                <table  className="min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className='px-6 py-2 text-center text-m font-medium'> Nombre </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Isbn </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Fecha de Publicacion </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Descripción </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Imagen </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Detalle </th>
                        </tr>

                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {libros.map(libro => (
                            <tr key={libro.id} className='hover:bg-blue-50'>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 '>{libro.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 '>{libro.isbn}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{libro.publishingDate}</td>
                                <td className='px-6 py-4 text-sm text-gray-900'>{libro.description}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    <ImagenesExternas src={libro.image} alt={libro.name} width={64} height={64} />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    <Link href={`/books/${libro.id}`} className='p-2  bg-blue-800 text-white rounded hover:bg-blue-900'>
                                            Detalles
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ListaLibros;