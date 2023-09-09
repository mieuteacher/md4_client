import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default 
<>
<Route path="/products" element={Lazy(() => import("@pages/products/Product"))()}>
  <Route path=":id" element={Lazy(() => import("@pages/products/productDetails/ProductDetail"))()}></Route>
</Route>
<Route path="/product-list" element={Lazy(() => import("@pages/products/ProductList"))()}></Route>
<Route path="/cart" element={Lazy(() => import("@pages/products/Cart"))()}></Route>
<Route path="/check-order" element={Lazy(() => import("@pages/products/CheckOrder"))()}></Route>
</>