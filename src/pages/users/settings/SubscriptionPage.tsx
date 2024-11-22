import CustomNumberInputSpinner from "@components/inputs/CustomNumberInputSpinner";
import DocumentTitle from "@components/navigation/DocumentTitle";

export const SubscriptionPage = () => {
  DocumentTitle('Configuración | Suscripción');

  return (
    <div className="flex-1 pt-4 space-y-6">
      <div>
        <p className="font-bold">Unidades contratadas</p>
        <p className="font-regular">Puedes agregar o reducir el número de unidades para el monitoreo de tu flota.</p>
      </div>
      <div>
        <CustomNumberInputSpinner min={0} />
      </div>
    </div>
  );
}