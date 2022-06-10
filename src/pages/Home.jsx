import React from 'react';
import Filters from '../components/Filters/Filters';
// import Order from '../components/Order/Order';
import Table from '../components/Table/Table';

function Home() {
  return (
    <main>
      <Filters />
      {/* <Order /> */}
      <Table />
    </main>
  );
}

export default Home;
