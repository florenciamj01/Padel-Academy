import { useEffect, useState } from "react";
import axios from "axios";

const useFetchCanchas = (endpoint, itemsPorPagina = 10) => {
    const [canchas, setCanchas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCanchas = async (pagina = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(endpoint, {
                params: { page: pagina, size: itemsPorPagina },
            });
            const data = response.data;

            setCanchas(data.canchas || []);
            setTotalPaginas(Math.ceil(data.total / itemsPorPagina));
            setError(null);
        } catch (err) {
            setError(err.message || "Error al cargar las canchas");
        } finally {
            setLoading(false);
        }
    };

    const refetchCanchas = () => {
        fetchCanchas(paginaActual); 
    };

    useEffect(() => {
        fetchCanchas(paginaActual);
    }, [paginaActual, endpoint]); 

    const siguientePagina = () => {
        if (paginaActual < totalPaginas) setPaginaActual((prev) => prev + 1);
    };

    const anteriorPagina = () => {
        if (paginaActual > 1) setPaginaActual((prev) => prev - 1);
    };

    return {
        canchas,
        paginaActual,
        totalPaginas,
        loading,
        error,
        siguientePagina,
        anteriorPagina,
        setPaginaActual,
        refetchCanchas
    };
}


export default useFetchCanchas;
