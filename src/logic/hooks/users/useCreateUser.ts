import usersService from "@logic/services/users.service";
import { useMutation } from "@tanstack/react-query";

interface userData {
  name: string;
  email: string;
  phone: string;
  id_time_zone: string;
  roles: string[];
  permissions: string[];
}

const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: async (userData: userData) => {
      const data = await usersService.createUser(userData);
      return data;
    },
    onMutate: () => {
      console.log('Mutación en progreso...');
    },
    onSuccess: (data) => {
      console.log('User creado con éxito:', data);
    },
    onError: (error) => {
      console.error('Error al crear el trip:', error);
    },
  });

  return mutation;
};

export default useCreateUser;