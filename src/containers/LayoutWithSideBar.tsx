import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '@components/navigation/NavBar';
import { SideBarMenuItems } from '@logic/interfaces/RouterInterface';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '@logic/redux/slices/routeSlice';
import { RootState } from '@logic/redux/store';

function LayoutWithSideBar(
  { loading = false,
    children,
    sideBarItems
  }: {
    loading?: boolean,
    children?: React.ReactNode,
    sideBarItems: SideBarMenuItems[]
  }) {
  const dispatch = useDispatch();

  const handleSetName = (name: string) => {
    dispatch(setName(name));
  }

  const routeName = useSelector((state: RootState) => state.route.name);

  return (
    <div className='flex flex-col flex-1 min-h-screen bg-[#F7F8FC] relative'>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NavBar />
      <div className="flex flex-1">
        <div className="w-[22.1%] py-8 px-12 flex-col space-y-6 bg-white">
          {
            sideBarItems.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <p className="text-black font-bold">{item.parent_name}</p>
                {
                  item.childs.map((child, index) => (
                    <Link 
                      onClick={() => handleSetName(child.name)} 
                      to={child.route} 
                      key={index} 
                      className={`font-regular ${routeName === child.name ? 'text-[#0071C2] underline font-bold' : ''}`}
                    >
                      {child.name}
                    </Link>
                  ))
                }
              </div>
            ))
          }
        </div>
        <div className="flex flex-1 flex-grow py-8 px-12 flex-col">
          {!loading && children}
        </div>
      </div>
    </div>
  );
}

export default LayoutWithSideBar;