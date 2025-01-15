import { useEffect, useState} from "react";
import axios from "axios";

const useFetchReservas = (endpoint, itemsPorPagina) => {
    const [reservas, setReservas] = useState([]);
    const [paginaActualRes, setPaginaActualRes] = useState(1);
    const [totalPaginasRes, setTotalPaginasRes] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReservas = async (pagina = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(endpoint, {
                params: { page: pagina, size: itemsPorPagina },
            });
            const data = response.data;

            setReservas(data.reservas || []);
            setTotalPaginasRes(Math.ceil(data.total / itemsPorPagina));
            setError(null);
        } catch (err) {
            setError(err.message || "Error al cargar las reservas");
        } finally {
            setLoading(false);
        }
    };

    const refetchReservas = () => {
        fetchReservas(paginaActualRes); 
    };

    useEffect(() => {
        fetchReservas(paginaActualRes);
    }, [paginaActualRes, endpoint]); 

    const siguientePaginaRes = () => {
        if (paginaActualRes < totalPaginasRes) setPaginaActualRes((prev) => prev + 1);
    };

    const anteriorPaginaRes = () => {
        if (paginaActualRes > 1) setPaginaActualRes((prev) => prev - 1);
    };

    return {
        reservas,
        paginaActualRes,
        totalPaginasRes,
        loading,
        error,
        siguientePaginaRes,
        anteriorPaginaRes,
        setPaginaActualRes,
        refetchReservas
    };
}


export default useFetchReservas;
