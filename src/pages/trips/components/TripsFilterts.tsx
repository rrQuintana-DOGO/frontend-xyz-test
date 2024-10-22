/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fade, Popper } from "@mui/material";
import React, { useEffect } from "react";
import CustomSelectField from "../../../components/inputs/CustomSelectField";
import { useFormik } from "formik";
import { CustomButton } from "../../../components/inputs/CustomButton";
import Title from "../../../components/Title";
import useGetAllStatus from "../../../logic/hooks/status/useGetAllStatus";

const TripsFilters = () => {
  const { data: statusData, isLoading: statusLoading, error: statusError } = useGetAllStatus({ limit: 100, page: 1 });
  const [statusList, setStatusList] = React.useState<any[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const formik = useFormik({
    initialValues: { search: '', status: '' },
    onSubmit: (values) => {
      console.log('submit', values);
    },
  });

  const transformStatus = (status: any) => {
    return status.map((item: any) => ({
      value: item.id_status,
      label: item.name,
    }));
  }

  useEffect(() => {
    if (statusData) {
      setStatusList(transformStatus(statusData.data));
    }
  }, [statusData]);


  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-row flex-1 py-3 space-x-3 w-1/2 ms-auto">
      <div className="w-full bg-white border border-zinc-200 px-3 py-1 rounded-md flex flex-row space-x-3 group items-center">
        <span className="text-black">
          <i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm" />
        </span>
        <input
          type="text"
          name="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-transparent w-full text-black focus:outline-none text-sm"
          placeholder='Buscar'
        />
      </div>

      <div>
        <button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          className={`bg-white text-black px-3 py-2 rounded-md border ${open ? 'border-blue-300' : 'border-zinc-200'}`}
        >
          Filtros
        </button>

        <Popper id={id} open={open} anchorEl={anchorEl} transition placement="bottom-end">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <div className="bg-white shadow-xl p-5 rounded mt-3 border border-zinc-200 flex flex-col space-y-5">
                <Title size="sm" label="Filtros" />
                {
                  statusLoading && <p>Cargando...</p>
                }
                {
                  statusError && <p>Error al cargar los estatus</p>
                }
                {
                  !statusLoading && !statusError && (
                    <>
                      <CustomSelectField
                        name="status"
                        label="Estatus"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.status}
                        touched={formik.touched.status}
                        options={statusList}
                      />
                      <div className="flex flex-row space-x-12">
                        <CustomButton
                          label="Limpiar"
                          color="secondary"
                          variant="ghost"
                          size="md"
                          onClick={formik.resetForm}
                        />
                        <CustomButton
                          label="Aplicar"
                          color="primary"
                          variant="solid"
                          size="md"
                          onClick={formik.handleSubmit}
                        />
                      </div></>
                  )
                }

              </div>
            </Fade>
          )}
        </Popper>
      </div>
    </form>
  );
};

export default TripsFilters;
