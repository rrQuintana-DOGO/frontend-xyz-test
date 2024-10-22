import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

export default function DrawerNavigator({ open, toggleDrawer }: { open: boolean; toggleDrawer: () => void }) {
  const navigate = useNavigate();

  const routes = [
    {
      name: 'Módulo de viajes',
      link: '/viajes',
    },
    {
      name: 'Alertas',
      link: '/alertas',
    },
    {
      name: 'Configuración',
      link: '/configuracion',
    },
    {
      name: 'Cerrar sesión',
      link: '/',
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <p className="px-4 py-4 bg-[#D3DAE6] mb-[-8px] font-light">Dashboard</p>
      <List>
        {routes.map((route, index) => (
          <div key={route.name}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(route.link)}>
                <ListItemText primary={route.name} primaryTypographyProps={{ variant: 'body2' }} />
              </ListItemButton>
            </ListItem>
            {index < routes.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer}>
      {DrawerList}
    </Drawer>
  );
}
