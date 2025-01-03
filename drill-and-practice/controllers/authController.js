import * as authService from '../services/authService.js';

const register = async ({ request, response }) => {
  const body = await request.body().value;
  const email = body.email?.trim();
  const password = body.password;

  const errors = await authService.validateRegistration(email, password);
  if (Object.keys(errors).length) {
    response.body = { email, errors };
    return;
  }

  await authService.registerUser(email, password);
  response.redirect('/auth/login');
};

const login = async ({ request, response }) => {
  const body = await request.body().value;
  const email = body.email;
  const password = body.password;

  const user = await authService.authenticateUser(email, password);
  if (!user) {
    response.body = { error: 'Invalid credentials' };
    return;
  }

  response.redirect('/');
};

const logout = ({ response }) => {
  response.redirect('/');
};

export { register, login, logout }