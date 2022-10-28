import { useRouter } from "next/router";
import useQuiosco from "../hooks/useQuiosco";

const steps = [
  { step: 1, nombre: "Menú", url: "/" },
  { step: 2, nombre: "Resumen", url: "/resumen" },
  { step: 3, nombre: "Datos y Total", url: "/total" },
];

const Steps = () => {
    const {handleSetStep} =useQuiosco()
    const router = useRouter()

    const calcularProgreso = () => {
        let valor;
        if (router.pathname === "/") {
          valor = 2;
        } else if (router.pathname === "/resumen") {
          valor = 50;
        } else {
          valor = 100;
        }
        return valor;
      };

    return (
        <>
          <div className="flex justify-between mb-5">
            {steps.map((step) => (
              <button
                onClick={() => {
                  router.push(step.url);
                  handleSetStep(step.step)
                }}
                className="text-2xl font-bold"
                key={step.step}
              >
                {step.nombre}
              </button>
            ))}
          </div>
    
          <div className="bg-gray-100 mb-10 rounded-full">
            <div
              className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white progreso"
              style={{ width: `${calcularProgreso()}%` }}
            >
            </div>
          </div>
        </>
      );
    };
    
export default Steps;
    