import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.grey[700],
    boxShadow:
      'rgb(255 255 255 / 0%) 0px 0px 0px 0px, rgba(0 0 0 / 5%) 0px 0px 0px 1px, rgba(0 0 0 / 10%) 0px 10px 15px -3px, rgba(0 0 0 / 5%) 0px 4px 6px -2px',
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface CustomMenuImageProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export default function CustomMenuImage({ src, alt, size = 'medium', children }: CustomMenuImageProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`rounded-full cursor-pointer ${sizeClasses[size]}`}
        onClick={handleClick}
      />
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </StyledMenu>
    </div>
  );
}