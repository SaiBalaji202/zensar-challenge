module.exports = (err, req, res, next) => {
  console.log(err.message);
  return res.status(500).send({ msg: 'Something went wrong.' });
};
