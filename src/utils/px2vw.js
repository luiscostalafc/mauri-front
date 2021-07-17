/* eslint-disable @typescript-eslint/explicit-function-return-type */
const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

export default px2vw;
