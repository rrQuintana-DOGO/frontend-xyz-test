import MenuIcon from '@mui/icons-material/Menu';

export default function SearchAppBar({ toggleDrawer }: { toggleDrawer: () => void }) {
  return (
    <div className='flex flex-1 bg-black text-white py-2 px-5 justify-between items-center'>
      <button onClick={toggleDrawer} className='text-white'>
        <MenuIcon />
      </button>
      <div className="w-1/3 bg-zinc-900 border border-zinc-700 px-3 py-1 rounded flex flex-row space-x-3 group">
        <span className="text-white"><i className="fa-solid fa-magnifying-glass text-zinc-400 text-sm" /></span>
        <input
          type="text"
          className="bg-transparent w-full text-white focus:outline-none text-sm"
          placeholder='Buscar viajes, operadores, id'
        />
      </div>
      <img src="https://via.placeholder.com/150" alt="logo" className="w-6 h-6 rounded-full bg-white" />
    </div>
  );
}
