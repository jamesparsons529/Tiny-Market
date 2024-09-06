import React from 'react';

function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      date: '9/4/2024',
      amount: '0.5 ETH',
      type: 'Buy',
      status: 'Completed',
    },
    {
      id: 2,
      date: '5/9/2024',
      amount: '1.2 ETH',
      type: 'Sell',
      status: 'Pending',
    }
  ];

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      <table className="transaction-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;