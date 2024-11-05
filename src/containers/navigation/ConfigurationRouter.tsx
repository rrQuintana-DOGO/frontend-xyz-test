import { RouterInterface } from "@utils/interfaces/RouterInterface";
import { Routes, Route } from "react-router-dom";
export default function ConfigurationRouter({ routes } : { routes: RouterInterface[] }) {
  return (
    <Routes>
      {
        routes.map((route: RouterInterface, index: number) => (
          <Route key={index} path={route.route} element={<route.component />} />
        ))
      }
    </Routes>
  )
}