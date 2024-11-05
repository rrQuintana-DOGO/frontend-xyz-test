import ConfigurationRouter from "@containers/navigation/ConfigurationRouter";
import PageContainerWithSideBar from "@containers/PageContainerWithSideBar";
import { configIndex } from "./indexes/ConfigIndex";
import { useSelector } from "react-redux";
import { RootState } from "src/logic/redux/store";

const ConfigPage = () => {
  const configRoutes = configIndex.map((item) => item.childs).flat();
  const routeName = useSelector((state: RootState) => state.route.name);

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