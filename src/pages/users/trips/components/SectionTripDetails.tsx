import { CustomButton } from "@components/inputs/CustomButton";
import cn from 'classnames';

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
  const gridClasses = cn({
    [`grid-cols-${cols}`]: cols,
    [`gap-${gap}`]: gap
  });
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
      <div className={`grid ${gridClasses}`}>
        {children}
      </div>
    </div>
  )
}

export default sectionTripDetails;