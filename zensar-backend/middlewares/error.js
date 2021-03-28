module.exports = (err, req, res, next) => {
  console.log(err.message, err);
  return res.status(500).send({ msg: 'Something went wrong.' });
};
