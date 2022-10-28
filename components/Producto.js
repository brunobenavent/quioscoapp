import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"


const Producto = ({producto}) => {
    const{ handleSetProducto, handelSetModal } = useQuiosco()
    const { nombre, precio, imagen } = producto
  return (
    <div className="border p-3">
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt= {`Imagen plato ${nombre}`}
            width={400}
            height={500}
        />
        <div className="p-5">
            <h3 className="font-bold text-2xl ">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
            <button
              type="button"
              className="bg-indigo-600 hover:bg-indigo-800 font-bold uppercase text-white rounded w-full mt-5  text-xl p-3"
              onClick={()=>{
                handleSetProducto(producto)
                handelSetModal()
              }}
            >
                Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto
