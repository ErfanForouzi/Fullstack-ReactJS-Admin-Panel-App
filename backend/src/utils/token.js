import jwt from "jsonwebtoken";
export function generateAccessToken(user) {
  const accessToken = jwt.sign(
    { id: user.id, username:user.username, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return accessToken
}
export function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    { id: user.id, username:user.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
  return refreshToken
}
