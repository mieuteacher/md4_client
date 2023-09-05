import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default 
<Route path="/products" element={Lazy(() => import("@pages/products/Product"))()}>
  <Route path=":id" element={Lazy(() => import("@pages/products/productDetails/ProductDetail"))()}></Route>
</Route>