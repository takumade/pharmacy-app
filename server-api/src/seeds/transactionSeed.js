const transactionSeed = (userId, pharmacyId, orderId, orderTotal) => {
  const currentTimestamp = Date.now();
  const transactionId = `txn-${userId}-${pharmacyId}-${currentTimestamp}`;
  return {
    transactionId: transactionId,
    orderId: orderId,
    userId: userId,
    pharmacyId: pharmacyId,
    amount: orderTotal,
    timestamp: currentTimestamp,
    status: "success",
    responseCode: "00",
    responseMessage: "Transaction successful",
    paymentGateway: "cash_on_delivery",
    data: "Additional transaction data",
  };
};


module.exports = transactionSeed
