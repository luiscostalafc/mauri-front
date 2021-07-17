/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';
import { Grid, Box } from '@chakra-ui/react';
import { Card } from 'react-bootstrap'

 type MeasureOptionsProps= {
   valuesMeasure?: string | any;
 };

export default function MeasureProducts({ valuesMeasure }: MeasureOptionsProps) {

  return (
    <>
   <Grid templateColumns="repeat(2, 1fr)" gap={6}>
     {valuesMeasure ? (
        valuesMeasure.map((valueMeasure: string) => {
          <Box width="100px" h="10" bg="gray.300">
          <Card>
          <Card.Body>{valueMeasure}</Card.Body>
          </Card>
        </Box>
        })
     ) : (
       <Box w="100%">Não há medidas</Box>
     )

     }

   </Grid>

    </>
  );
}
