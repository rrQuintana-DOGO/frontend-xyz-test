import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BreadcrumbsProps {
  mainRoute?: { label: string; href: string };
  primaryRoute?: { label: string; href: string };
  secondaryRoute?: string;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({
  mainRoute = { label: 'Home', href: '/' },
  primaryRoute,
  secondaryRoute,
}) => {
  return (
    <div role="presentation" onClick={handleClick} className='mb-5'>
      <Breadcrumbs aria-label="breadcrumb">
        {mainRoute && (
          <Link underline="hover" color="inherit" href={mainRoute.href}>
            {mainRoute.label}
          </Link>
        )}
        {primaryRoute && (
          <Link underline="hover" color="inherit" href={primaryRoute.href}>
            {primaryRoute.label}
          </Link>
        )}
        {secondaryRoute && (
          <Typography
            sx={{ color: 'text.primary' }}
          >
            {secondaryRoute}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumbs;
