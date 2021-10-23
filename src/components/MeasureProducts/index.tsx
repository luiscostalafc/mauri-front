/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';
import { Grid, Box, Checkbox, HStack, Heading } from '@chakra-ui/react';

type MeasureOptionsProps = {
  valuesMeasure?: string | any;
};

export default function MeasureProducts({
  valuesMeasure,
}: MeasureOptionsProps) {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {valuesMeasure ? (
          valuesMeasure.map((valueMeasure: string) => {
            return (
              <>
                <Box width="100px" h="18" bg="gray.300">
                  <Box>
                    <Box border="solid 2px black">
                      <HStack spacing={1} direction="column">
                        <Checkbox colorScheme="orange" value={valueMeasure}>
                          <Heading marginBottom="-5px" fontSize="14px">
                            {valueMeasure}
                          </Heading>
                        </Checkbox>
                      </HStack>
                    </Box>
                  </Box>
                </Box>
              </>
            );
          })
        ) : (
          <Box w="100%">Não há medidas</Box>
        )}
      </Grid>
    </>
  );
}
