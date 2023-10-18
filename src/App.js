import "./App.css";
import axios from "axios";

// Components
import Layout from "./layouts";

// Contexts
import { UserProvider } from "./contexts";

// Services
import { AuthenticationService } from "./services/auth.service";

axios.defaults.baseURL = "http://localhost:8080/api/";

axios.interceptors.request.use(req => {
  const token = AuthenticationService.getAuthToken();
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

axios.interceptors.response.use(
  res => res,
  err => {
    if (err?.response?.status === 401 && !window.location.href.includes('/login')) {
      window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.href.replace(window.location.origin, ''))}`;
    } else throw err;
  },
);

function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

export default App;
