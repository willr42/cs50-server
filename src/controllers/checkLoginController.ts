import { RequestHandler } from 'express';

const checkLogin: RequestHandler = async (req, res) => {
  if (req.session.loggedIn) {
    console.log('logged in');
    return res.status(200).json({ message: 'logged in', isLoggedIn: true });
  } else {
    console.log('not logged in');
    return res.status(401).json({ error: 'not logged in', isLoggedIn: false });
  }
};

export default checkLogin;
