import ConfigurationRouter from "@containers/navigation/ConfigurationRouter";
import PageContainerWithSideBar from "@containers/PageContainerWithSideBar";
import { configIndex } from "@pages/users/settings/indexes/ConfigIndex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@logic/redux/store";
import { useEffect } from "react";
import { setName } from "@logic/redux/slices/routeSlice";

const ConfigPage = () => {
  const configRoutes = configIndex.map((item) => item.childs).flat();
  const routeName = useSelector((state: RootState) => state.route.name);
  const dispatch = useDispatch();

  const handleSetName = (name: string) => {
    dispatch(setName(name));
  }

  useEffect(() => {

    if (routeName === '') {
      const pathParts = window.location.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      const nameRoute = configRoutes.find((route) => route.route === lastPart)?.name
      if (nameRoute) {
        handleSetName(nameRoute);
      }
    }

  }, [routeName])

  return (
    <PageContainerWithSideBar
      title={routeName}
      mainRoute={{ label: 'Inicio', href: '/configuracion' }}
      secondaryRoute="Configuración"
      sideBarItems={configIndex}
    >
      <ConfigurationRouter
        routes={configRoutes}
      />
    </PageContainerWithSideBar>
  );
}

export default ConfigPage;

