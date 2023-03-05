import React from 'react';
import { connect } from 'react-redux';
import NewHeader from '../components/NewHeader';
import NewTable from '../components/NewTable';
import NewForm from '../components/NewForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <NewHeader />
        <NewForm />
        <NewTable />
      </div>
    );
  }
}

export default connect()(Wallet);
