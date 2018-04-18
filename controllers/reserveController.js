module.exports = {
  deleteReserve(req, res, reserve, waitList) {
    const reservation = req.body,
      currentReserve = reserve.filter(
        (e) => e.uniqueID == reservation.uniqueID
      )[0],
      table = currentReserve.tableNo;

    if (!table) {
      res.status(404).send({ message: 'undefined' });
    }

    reserve.pop(currentReserve);
    const waitListed = waitList.splice(0)[0];
    waitListed.tableNo = table;
    reserve.push(waitListed);
    return res.status(200).send({ status: 'removed' });
  },
};
