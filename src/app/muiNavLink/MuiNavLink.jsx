'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';

export default function MuiNavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <Box style={{ textDecoration: 'none', }}
        component="span"
                sx={{
                  color: {
          xs: isActive ? "#272727ff" : "#272727ff",   
          sm: isActive ? "#272727ff" : "#272727ff", 
          md: isActive ? "#fff" : "#fff",
          lg: isActive ? "#fff" : "#fff", 
          },
          fontWeight: isActive ? 'mideum' : 'normal',
          borderBottom: isActive ? '2px solid white' : 'none',
          py: 1,
          cursor: 'pointer',
          transition: '0.3s',
  textDecoration: 'none'
        }}
      >
        {label}
      </Box>
    </Link>
  );
}
