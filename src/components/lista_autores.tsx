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

interface Autor {
    id: number;
    birthDate: string;
    name: string;
    description: string;
    image: string;
    books: Book[];
}

const ListaAutores = () => {
    const [autores, setAutores] = useState<Autor[]>([]);
    const [update,setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchAutores = async () =>{
            try {
                const response = await fetch(`${apiUrl}/api/authors`, {
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error('Error en la conexión con la API');
                }
                const data = await response.json();
                setAutores(data);
            } catch (error) {
                console.log(error);
                console.log(apiUrl)
                setError(
                    "No se pudieron cargar los servicios. Por favor, intente más tarde."
                );
            } finally {
                setIsLoading(false);
            } 
        }
        fetchAutores();
    }, [update]);

    const borrarAutor = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/api/authors/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Error en la conexión con la API');
            }else{
                alert("Autor eliminado exitosamente");
                setUpdate(!update)
            }
            } catch (error) {
                console.error(error);
            }
    }

    if (isLoading) {
    return <div className="text-center p-8">
            <h1 className='font-bold text-xl'>
                Cargando autores...
            </h1>
        </div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 justify-center items-center">
            <h2 className='text-xl font-bold p-2 pb-4'>Lista de Autores</h2>
        

            <div className='overflow-x-auto mb-4 w-[80rem] mx-auto'>
                <table  className="min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className='px-6 py-2 text-center text-m font-medium'> Nombre </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Fecha de Nacimiento </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Descripción </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Imagen </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Editar </th>
                            <th className='px-6 py-2 text-center text-m font-medium'> Eliminar </th>
                        </tr>

                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {autores.map(autor => (
                            <tr key={autor.id} className='hover:bg-blue-50'>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 '>{autor.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{autor.birthDate}</td>
                                <td className='px-6 py-4 text-sm text-gray-900'>{autor.description}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    <ImagenesExternas src={autor.image} alt={autor.name} width={120} height={120} />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    <Link href={`/authors/${autor.id}`} className='p-2  bg-blue-800 text-white rounded hover:bg-blue-900'>
                                            Editar
                                    </Link>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    <button onClick={() => borrarAutor(autor.id)}>
                                        <Link href="#" className='p-2  bg-red-800 text-white rounded hover:bg-red-900'>
                                            Borrar Autor
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ListaAutores;