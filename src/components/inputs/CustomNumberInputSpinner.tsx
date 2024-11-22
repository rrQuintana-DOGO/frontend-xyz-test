import * as React from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CustomNumberInputSpinner = React.forwardRef(function CustomNumberInputSpinner(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyleRightButton,
        decrementButton: StyleLeftButton
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="medium"  />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize='medium'  />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default CustomNumberInputSpinner


const StyledInputRoot = styled('div')(
  () => `
  font-weight: 400;
  color: #9DA8B7;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  () => `
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375;
  color: #1C2025;
  background: #fff;
  border: 0.063rem solid;
  border-color: #E7E9F1;
  padding: 1.188rem 0.75rem;
  outline: 0;
  min-width: 9.688rem;;
  height: 2.5rem;
  width: 9.688rem;
  text-align: left;

  &:hover {
    border-color: #E7E9F1;
  }

  &:focus {
    border-color: #E7E9F1;
  }

  &:focus-visible {
    outline: 0;
  }
`,
);


const StyleGeneralButton = styled('button')(
  () => `
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 0.063rem solid;
  border-color: #E7E9F1;
  background: #E9EDF3;
  color: #1C2025;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: #007fff;
    border-color: #3399ff;
    color: #F3F6F9;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);

const StyleRightButton = styled(StyleGeneralButton)(
  () => `
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`,
);

const StyleLeftButton = styled(StyleGeneralButton)(
  () => `
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`,
);