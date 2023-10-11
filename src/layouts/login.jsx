import { LoginRoutes } from "../routers";
import { Routes, Route } from "react-router-dom";

const Wrapper = ({ Component }) => <Component />;

const LoginLayout = () => {
  return (
    <Routes>
      {LoginRoutes.map((route, index) => (
        <Route
          path={route.path}
          key={`${index}-${route.name}`}
          element={<Wrapper Component={route.component} />}
        />
      ))}
    </Routes>
  );
};

export default LoginLayout;
