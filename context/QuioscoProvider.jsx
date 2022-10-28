import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatearDinero } from '../helpers'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [steps, setSteps] = useState(1)
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)


 
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

    useEffect(() =>{
        const totalAPagar = pedido.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0)

        setTotal(formatearDinero(totalAPagar))
    }, [pedido])

    const handleSetCategoriaActual = id => {
        const categoria = categorias.find(cat => cat.id ===id)
        setCategoriaActual(categoria)
        
    }
    const handleSetProducto = ({categoriaId, ...producto}) => setProducto(producto)

    const handelSetModal = () => setModal(!modal)

    const handleSetPedido = producto => {
        let ExisteProductoPedido = pedido.some(productoState => productoState.id === producto.id)

        if(ExisteProductoPedido){
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            
            setPedido( pedidoActualizado) 
            toast.success('Guardado correctamente', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })  
            
        }else{
            setPedido( [...pedido, producto])
            toast.success('Agregado al pedido', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })   
            

        }
        setModal(false)
        
    }
    const handleSetStep = step => setSteps(step)

    const handleEditarCantidades = id =>{
        setModal(true)
        const productoActualizar = pedido.find(producto => producto.id=== id)
        setProducto(productoActualizar)
    }
    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }
    const colocarOrden = e =>{
        e.preventDefault()
        console.log('enviando orden')

    }
    
   
    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                handleSetCategoriaActual,
                categoriaActual,
                producto,
                handleSetProducto,
                modal,
                handelSetModal,
                pedido,
                handleSetPedido,
                handleSetStep,
                steps,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                total,
                setTotal,
                colocarOrden
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