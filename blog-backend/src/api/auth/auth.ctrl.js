import Joi from 'joi';
import User from '../../models/user';

/**
 * POST /api/auth/register
 * {
 *  "username": "velopert",
 *  "password": "mypass123"
 * }
 */
export const register = async (ctx) => {
  // Verify Request Body
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    // check if username exist
    const exists = await User.findByUsername(username);

    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({ username });
    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true, // this will block the JavaScript reads the cookie
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * POST /api/auth/login
 * {
 *  "username": "velopert",
 *  "password": "mypass123"
 * }
 */
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  // Error handler for none-existing username and password
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);

    // Error handler for none-exsting user
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.checkPassword(password);

    // Error handler for validating password
    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true, // this will block the JavaScript reads the cookie
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/auth/check
 */
export const check = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    // Not logged in
    ctx.status = 401; // Unauthorized
    return;
  }

  ctx.body = user;
};

/**
 * POST /api/auth/logout
 */
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
