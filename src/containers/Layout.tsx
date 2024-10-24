import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../components/NavBar';

function Layout({ loading = false, children }: { loading?: boolean, children?: React.ReactNode }) {
  return (
    <div className='flex flex-col flex-1 min-h-screen bg-[#F7F8FC] relative'>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NavBar />
      <div className="flex flex-1 flex-grow py-8 px-12 flex-col">
        {!loading && children}
      </div>
    </div>
  )
}

export default Layout