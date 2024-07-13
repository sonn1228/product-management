const createTreeHelper = require('../../helpers/createTree.helper');

module.exports.index = async (req, res) => {
  res.render('client/pages/home/index.pug', {
    titlePage: 'Client Product',
  });
};
