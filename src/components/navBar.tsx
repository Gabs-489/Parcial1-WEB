import Link from "next/link";
import React from "react";

const NavBar = () => {
    return(
        <div className="bg-gray-200 p-4">
            <nav>
                <Link href="/authors" className="px-3 hover:text-gray-500">
                    Autores
                </Link>
                <Link href="/crear" className="px-3 hover:text-gray-500">
                    Crear Autor
                </Link>
                 <Link href="/books" className="px-3 hover:text-gray-500">
                    Libros
                </Link>

            </nav>
        </div>
    );
}

export default NavBar;