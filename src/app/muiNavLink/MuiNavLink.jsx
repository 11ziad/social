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
          xs: isActive ? "#272727ff" : "#272727ff",     // موبايل
          sm: isActive ? "#272727ff" : "#272727ff",    // تابلت صغير
          md: isActive ? "#ccc" : "#222",       // لابتوب
          lg: isActive ? "#fff" : "#fff",       // شاشات كبيرة
          },
          fontWeight: isActive ? 'bold' : 'normal',
          borderBottom: isActive ? '2px solid white' : 'none',
           px: 2,
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
