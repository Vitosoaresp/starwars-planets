import React from 'react';
import Filters from '../components/Filters';
import Order from '../components/Order';
import Table from '../components/Table';

function Home() {
  return (
    <main>
      <Filters />
      <Order />
      <Table />
    </main>
  );
}

export default Home;
