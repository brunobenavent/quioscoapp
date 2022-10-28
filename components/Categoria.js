import Image from "next/image";
import { useRouter } from "next/router";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const {id, nombre, icono} = categoria
  const {categoriaActual, handleSetCategoriaActual} = useQuiosco()

  const router = useRouter()

  return (
    <div className={`${categoriaActual?.id===id ? 'bg-amber-400' : ''} flex transition-colors items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <Image
          width={70}
          height = {70}
          alt={`Imagen de la caegoría de ${nombre}.`}
          src={`/assets/img/icono_${icono}.svg`}
        />
      <button
        type="button"
        className="font-bold text-2xl hover:cursor-pointer"
        onClick={() => {
          handleSetCategoriaActual(id)
          router.push('/')
        }}
      >
        {nombre}
      </button>

    </div>
  );
};

export default Categoria;
