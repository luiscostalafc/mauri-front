import {
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/core';
import React from 'react';

const Group: React.FC = () => {
  return (
    <Tabs defaultIndex={1}>
      <TabList>
        {/* <Tab>Sub Grupo</Tab> */}
        <Tab>Grupo</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Image
            size="100vh"
            objectFit="cover"
            src="https://i.imgur.com/wok6TAf.jpg"
          />
        </TabPanel>
        <TabPanel>
          <Image
            size="100vh"
            objectFit="cover"
            src="https://i.imgur.com/9fdAFwV.jpg"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Group;
