const ErrorMessage = ({ title, text }: { title: string, text: string }) => {
  return (
    <div className="bg-red-100 p-3 rounded space-y-3">
      <div className="flex flex-row space-x-3 items-center">
        <div className='border-2 p-2 rounded-full w-5 h-5 text-center border-red-500 flex items-center justify-center'>
          <i className="fa-solid fa-info text-red-500 text-xs" />
        </div>
        <p className="font-semibold text-lg text-red-500">{title}</p>
      </div>
      <p className="text-sm">
        {text}
      </p>
    </div>
  )
}

export default ErrorMessage