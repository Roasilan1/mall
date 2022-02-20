const Home = () =>
    import ('@/pages/Home/Home');
const Login = () =>
    import ("@/pages/Login");
const Search = () =>
    import ("@/pages/Search");
const Register = () =>
    import ("@/pages/Register");
const Detail = () =>
    import ("@/pages/Detail");
const AddCartSuccess = () =>
    import ('@/pages/AddCartSuccess')
const ShopCart = () =>
    import ('@/pages/ShopCart');
const Trade = () =>
    import ('@/pages/Trade');
const Pay = () =>
    import ('@/pages/Pay');
const PaySuccess = () =>
    import ('@/pages/PaySuccess');
const Center = () =>
    import ('@/pages/Center');
//meta
// tourist表示允许游客访问
// hideFooter 为真表示隐藏底部

const routes = [{
        path: "*",
        redirect: "./home"
    },
    {
        path: "/home",
        component: Home,
        meta: {
            tourist: true
        }
    }, {
        name: "search",
        path: "/search/:keyword?",
        component: Search,
        meta: {
            tourist: true
        }
    },
    {
        name: "Login",
        path: "/login/:redirect?",
        component: Login,
        meta: {
            hideFooter: true,
            tourist: true
        }
    }, {
        path: "/register",
        component: Register,
        meta: {
            hideFooter: true,
            tourist: true
        }
    }, {
        path: "/detail/:id",
        component: Detail,
        meta: {
            tourist: true
        }
    },
    {
        path: "/addCartSuccess",
        component: AddCartSuccess,
        meta: {
            tourist: true
        }
    },
    {
        path: "/shopCart",
        component: ShopCart,
    },
    {
        path: "/trade",
        component: Trade
    },
    {
        path: "/pay",
        component: Pay
    }, {
        path: "/paysuccess",
        component: PaySuccess
    },
    {
        path: "/center",
        component: Center
    }
];
export default routes;