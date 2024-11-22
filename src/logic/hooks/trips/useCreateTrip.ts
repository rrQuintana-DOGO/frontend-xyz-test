import tripsService from "@logic/services/trips.service";
import { useMutation } from "@tanstack/react-query";
import { TripDetails } from "@utils/transforms/parceNewTrip";

const useCreateTrip = () => {
  const mutation = useMutation({
    mutationFn: async (tripData: TripDetails) => {
      const data = await tripsService.createTrip(tripData);
      return data;
    },
    onMutate: () => {
      console.log('Mutación en progreso...');
    },
    onSuccess: (data) => {
      console.log('Trip creado con éxito:', data);
    },
    onError: (error) => {
      console.error('Error al crear el trip:', error);
    },
  });

  return mutation;
};

export default useCreateTrip;