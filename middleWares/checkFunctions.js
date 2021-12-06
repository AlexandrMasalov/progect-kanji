exports.isAdmin = (req, res, next) => {
  console.log('middelware isAdmin log... req.session:', req.session);
  if (req.session?.user?.admin) next();
  else res.send('не админ');
};

exports.isAuth = (req, res, next) => {
  if (req.session?.user?.name) next();
  else res.send('не авторизован'); // или res.redirect('to login page path')
};

exports.isValid = (req, res, next) => {
  console.log('middelware isValid log... req.body:', req.body);
  if (req.body.name && req.body.password) next();
  else res.send('не введен пароль или имя');
};

exports.isSameUser = (req, res, next) => {
  console.log('middelware isSameUser log...');
  console.log('req.body.name', req.body.name);
  console.log('req.session.user.name', req.session?.user.name);
  if (req.body.name === req.session?.user.name) next();
  else res.send('у вас нет прав');
};
