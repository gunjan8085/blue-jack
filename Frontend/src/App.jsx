import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import { PublicRoutes, UserRoutes, BusinessRoutes } from "@routes/index";

const renderRoutes = (routes) =>
  routes.map(({ path, element, children }, index) => (
    <Route key={index} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));
function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        {renderRoutes(PublicRoutes)}
        {renderRoutes(UserRoutes)}
        {renderRoutes(BusinessRoutes)}

        {/* Fallback for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
