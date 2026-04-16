// BIG INDIA MART - API Helper
// All frontend pages use this file to talk to the backend

const API = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('bim_token') || '';
}

function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() };
}

async function apiCall(endpoint, method = 'GET', body = null) {
  const opts = { method, headers: authHeaders() };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(API + endpoint, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

// AUTH
const Auth = {
  sendOTP: (mobile) => apiCall('/auth/send-otp', 'POST', { mobile }),
  verifyOTP: (mobile, otp) => apiCall('/auth/verify-otp', 'POST', { mobile, otp }),
  register: (data) => apiCall('/auth/register', 'POST', data),
  login: (email, password) => apiCall('/auth/login', 'POST', { email, password }),
  loginVerify: (email, otp) => apiCall('/auth/login-verify', 'POST', { email, otp }),
  adminLogin: (email, password) => apiCall('/auth/admin-login', 'POST', { email, password }),
};

// GROCERY
const Grocery = {
  getAll: (params = '') => apiCall('/grocery' + params),
  add: (data) => apiCall('/grocery', 'POST', data),
  update: (id, data) => apiCall('/grocery/' + id, 'PUT', data),
  delete: (id) => apiCall('/grocery/' + id, 'DELETE'),
};

// ORDERS
const Orders = {
  place: (data) => apiCall('/orders', 'POST', data),
  myOrders: () => apiCall('/orders/my'),
  allOrders: () => apiCall('/orders'),
  updateStatus: (id, status) => apiCall('/orders/' + id + '/status', 'PUT', { status }),
};

// ADMIN
const Admin = {
  stats: () => apiCall('/admin/stats'),
  customers: (params = '') => apiCall('/admin/customers' + params),
  customerById: (id) => apiCall('/admin/customers/' + id),
  updateKYC: (id, kycStatus) => apiCall('/admin/customers/' + id + '/kyc', 'PUT', { kycStatus }),
  toggleAccount: (id) => apiCall('/admin/customers/' + id + '/toggle', 'PUT'),
};
