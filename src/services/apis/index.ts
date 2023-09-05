import userModule from "./modules/user.module";
import categoryModule from "./modules/category.module";
import "./axios.instance";

export default {
    userApi: userModule,
    categoryApi: categoryModule
}