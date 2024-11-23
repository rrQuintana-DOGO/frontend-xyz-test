import { CustomButton } from "@components/inputs/CustomButton";

const sectionTripDetails = (
  {
    label,
    children,
    cols,
    gap,
    buttonLabel,
    click = () => { }
  }: {
    label?: string,
    children: React.ReactNode,
    cols: number,
    gap: number,
    buttonLabel: string,
    click?: () => void
  }) => {
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: `${gap * 0.25}rem`
  };
  return (
    <div className="flex-1 space-y-2">
      <div className="flex justify-between">
        <p className="font-bold">{label}</p>
        <CustomButton
          variant="text"
          label={buttonLabel}
          size="small"
          onClick={click}
          sx={{
            paddingLeft: 0
          }}
        />
      </div>
      <div style={gridStyles}>
        {children}
      </div>
    </div>
  )
}

export default sectionTripDetails;