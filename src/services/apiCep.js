/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as cep from 'cep-promise';

function cleanCep(cepNumber) {
  return cepNumber.replace('-', '');
}
export const getCEPData = async (cepNumber, logErrors = false) => {
  if (cepNumber.length > 5) {
    try {
      return await cep(cleanCep(cepNumber));
    } catch (error) {
      if (logErrors) console.log(error);
      return {};
    }
  }
};
