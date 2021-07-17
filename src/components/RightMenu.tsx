import { Button, ButtonGroup, Flex, Heading, Box } from '@chakra-ui/core';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

interface Option {
  variantColor: string;
  label: string;
}
const options: Option[] = [
  { variantColor: 'green', label: 'Orçamento' },
  { variantColor: 'yellow', label: 'Compras' },
  { variantColor: 'blue', label: 'Vendas' },
];

const RightMenu: React.FC = () => {
  const [isLargerThan1015] = useMediaQuery('(min-width:1015px)');
  return (
    <>
      {isLargerThan1015 ? (
        <Flex width="120%" marginLeft={{ md: '-60px' }}>
          <ButtonGroup spacing={4}>
            {options.map(({ variantColor, label }) => (
              <Button
                padding={{ xl: '5px' }}
                width={{ xl: '100px', lg: '85px', md: '79px', sm: '', xs: '' }}
                height={{ xl: '30px', lg: '30px', md: '30px', sm: '', xs: '' }}
                variantColor={variantColor}
                marginRight={{
                  xl: '5px',
                  lg: '3px',
                  md: '2px',
                  sm: '',
                  xs: '',
                }}
                variant="solid"
              >
                <Box
                  marginTop="3px"
                  width={{ xl: '20px', lg: '18px', md: '12px', sm: '', xs: '' }}
                  height={{
                    xl: '20px',
                    lg: '18px',
                    md: '15px',
                    sm: '',
                    xs: '',
                  }}
                  marginRight={{
                    xl: '3px',
                    lg: '2px',
                    md: '5px',
                  }}
                  marginLeft={{
                    xl: '3px',
                    lg: '2px',
                    md: '2px',
                    sm: '',
                    xs: '',
                  }}
                >
                  <FaCartArrowDown />
                </Box>

                <Heading
                  fontSize={{
                    xl: '14px',
                    lg: '12px',
                    md: '11px',
                    sm: '',
                    xs: '',
                  }}
                >
                  {label}
                </Heading>
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
      ) : null}
    </>
  );
};

export default RightMenu;
