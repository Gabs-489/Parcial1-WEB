"use client"; 
import React, { useState } from 'react';

const ForumalarioCrearAutor = () => {

    const[birthDate, setBirthDate] = useState('');
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[image, setImage] = useState('');

    const verificarNombre = (nombre:string) =>{
        if(typeof nombre === "string"){
            setName(nombre);
        }else{
            alert("El nombre no es válido");
        }
    }

    const verificarFechaNacimiento = (fechaI:string) =>{
        const fecha = new Date(fechaI);
        const fechaActual = new Date();
        if(fecha < fechaActual){
            setBirthDate(fechaI);
        }else{
            alert("La fecha de nacimiento no es válida");
        }
    }

    const verificarDescripcion = (descripcionI:string) =>{
        if(typeof descripcionI === "string"){
            setDescription(descripcionI);
        }else{
            alert("La descripción no es válida");
        } 
    }
    const verificarImagen = (imagen:string) =>{
        if(imagen.length !== 0 && (typeof imagen === "string")){
            setImage(imagen);
        }else{
            alert("La imagen no es válida");
        }
    }

    const hacerEnvio = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(birthDate === '' || name === '' || description === '' || image === ''){
            alert("Por favor, complete todos los campos");
            return;
        }
    }

    return (
        <div>
            <h2 className='text-xl font-bold p-2 pb-4'>Crear Autor</h2>
            <form onSubmit={hacerEnvio} className='w-1/2 mx-auto p-4 border border-gray-300 rounded'>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>Nombre:</label>
                    <input type='text' value={name} onChange={(e)=> verificarNombre(e.target.value)} className='w-full p-2 border border-gray-300 rounded' />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='birthDate'>Fecha de Nacimiento:</label>
                    <input type='date' value={birthDate} onChange={(e)=> verificarFechaNacimiento(e.target.value)} className='w-full p-2 border border-gray-300 rounded' />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='description'>Descripción:</label>
                    <textarea value={description} onChange={(e)=> verificarDescripcion(e.target.value)} className='w-full p-2 border border-gray-300 rounded'></textarea>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='image'>Imagen:</label>
                    <input type='text' value={image} onChange={(e)=> verificarImagen(e.target.value)} className='w-full p-2 border border-gray-300 rounded' />
                </div>
                <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>Crear Autor</button>
            </form>
        </div>
    )

}

export default ForumalarioCrearAutor;   