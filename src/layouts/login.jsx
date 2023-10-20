import { Suspense } from "react";
import { LoginRoutes } from "../routers";
import { Routes, Route } from "react-router-dom";
import LoadingFallback from "../components/LoadingFallback";

const Wrapper = ({ Component }) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

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
