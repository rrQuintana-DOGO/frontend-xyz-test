import { MenuItem } from "@mui/material";
import CustomMenuButton from "../../../../components/inputs/CustomMenuButton";

const ClientesFilters = () => {
  return (
    <div className="flex w-full my-3">
      <div className="w-1/2 ms-auto flex flex-row space-x-2">
        <div className="w-full bg-white border border-zinc-200 px-3 py-1 rounded-md flex flex-row space-x-3 group items-center">
          <span className="text-black">
            <i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm" />
          </span>
          <input
            type="text"
            name="search"
            className="bg-transparent w-full text-black focus:outline-none text-sm"
            placeholder='Buscar'
          />
        </div>
        <CustomMenuButton
          label="Filtros"
          color="secondary"
          variant="outlined"
          sx={{
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(229, 231, 235)',
          }}>
          <MenuItem>
            <p>asdf</p>
          </MenuItem>
        </CustomMenuButton>
      </div>
    </div>
  )
}

export default ClientesFilters