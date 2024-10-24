import { Box } from "@mui/system";
import CustomBreadcrumbs from "../../../components/CustomBreadcrumbs";
import Title from "../../../components/Title";
import Layout from "../../../containers/Layout";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import AdmonHomeFilters from "./components/AdmonHomeFilters";
import TabOperativo from "./components/TabOperativo";
import TabProducto from "./components/TabProducto";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AdminHomePage() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <CustomBreadcrumbs mainRoute={{ label: 'Inicio', href: '/inicio' }} />
      <Title label="Módulo admon" size="3xl" />
      <Box sx={{ width: '100%' }}>
        <div className="flex flex-row items-center justify-between">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '50%' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Operativo" {...a11yProps(0)} />
              <Tab label="Productivo" {...a11yProps(1)} />
              <Tab label="Finanzas" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <AdmonHomeFilters />
        </div>
        <CustomTabPanel value={value} index={0}>
          <TabOperativo />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabProducto />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          En desarrollo
        </CustomTabPanel>
      </Box>
    </Layout>
  )
}