import React from 'react'
import SearchAppBar from './SearchAppBar'
import DrawerNavigator from './DrawerNavigator';

const NavBar = () => {
  const [open, setOpen] = React.useState(false);

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