'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { SearchModal } from '../search/SearchModal';

export const NavbarWrapper = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
