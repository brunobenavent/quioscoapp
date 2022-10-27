import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
 

    const handleSetCategoriaActual = id => {
        const categoria = categorias.find(cat => cat.id ===id)
        setCategoriaActual(categoria)
        
    }
    const handelSetProducto = ({categoriaId, imagen, ...producto}) => {
        setProducto(producto)
    }

    const handelSetModal = () => setModal(!modal)
    const handleSetPedido = producto => {
        setPedido( [...pedido, producto])
    }

    useEffect(() => {
        const obtenerCategorias = async () => {
            const { data } = await axios('/api/categorias')
            setCategorias(data)
        }
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleSetCategoriaActual,
                categoriaActual,
                producto,
                handelSetProducto,
                modal,
                handelSetModal,
                pedido,
                handleSetPedido
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext