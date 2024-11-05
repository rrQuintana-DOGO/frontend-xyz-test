import { Fade, Popper } from "@mui/material"
import { CustomButton } from "../../../../components/inputs/CustomButton"
import { CustomButtonGroup } from "../../../../components/inputs/CustomButtonGroup"
import Title from "../../../../components/display/Title";
import { useState } from "react"

const AdmonHomeFilters = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <>
      <CustomButtonGroup variant="outlined" color="secondary" size="small">
        <CustomButton label="Últimos 7 días" onClick={() => console.log('One clicked')} />
        <CustomButton label="15 días" onClick={() => console.log('Two clicked')} />
        <CustomButton label="30 días" onClick={() => console.log('Three clicked')} />
        <CustomButton label="Selecciona fecha" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event)} />
      </CustomButtonGroup>

      <Popper open={open} anchorEl={anchorEl} transition placement="bottom-end">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className="bg-white shadow-xl p-5 rounded mt-3 border border-zinc-200 flex flex-col space-y-5">
              <Title size="sm" label="Ingresa un rango de fechas" />
              <p>En desarrollo</p>
            </div>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default AdmonHomeFilters