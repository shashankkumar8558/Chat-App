import jwt from "jsonwebtoken"

// JWT secret key (you should use a secure key in production)
const secretKey = 'ParleGst855821291213';

const generateTokeAndSetCookies = (userId, res) => {
  const Token = jwt.sign({ userId }, secretKey, { expiresIn: '15d' });

  res.cookie("jwt", Token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true,   // Ensures the cookie is only sent over HTTPS
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    sameSite: 'strict',  //CSRF attack cross-site request forgery attack
  })
}
export default generateTokeAndSetCookies;