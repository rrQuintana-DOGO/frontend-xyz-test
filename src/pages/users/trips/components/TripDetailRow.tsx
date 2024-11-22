const TripDetailRow = (
  {
    label,
    value,
    children
  }: {
    label: string,
    value?: string,
    children?: React.ReactNode
  }) => {
  return (
    <div>
      <p className="font-bold">{label}</p>
      <p>{value}</p>
      {children}
    </div>
  )
}

export default TripDetailRow;