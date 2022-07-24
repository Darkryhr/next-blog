import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';

const Searchbar = () => {
  const [value, setValue] = React.useState('');
  const handleChange = event => setValue(event.target.value);

  return (
    <>
      <Input
        width='full'
        maxW='xl'
        borderColor='gray.300'
        bg='white'
        value={value}
        onChange={handleChange}
        placeholder='Search'
        size='sm'
      />
    </>
  );
};

export default Searchbar;
