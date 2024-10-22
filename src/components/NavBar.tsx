import SearchAppBar from './SearchAppBar'
import DrawerNavigator from './DrawerNavigator';
import { useState } from 'react';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className='flex sticky top-0 z-10'>
      <DrawerNavigator toggleDrawer={toggleDrawer(false)} open={open} />
      <SearchAppBar toggleDrawer={toggleDrawer(true)} />
    </div>

  )
}

export default NavBar