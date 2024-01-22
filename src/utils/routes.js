import AppContainer from "../components/AppContainer/AppContainer";

const appRoutes = [
    {
        path: "",
        props: {
            "content": "main",
            "parent": null
        },
        component: AppContainer
    },
    {
        path: "/admin/dashboard",
        props: {
            "content": "admin.main",
            "parent": "admin"
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/view/all",
        props: {
            "content": "admin.fonts.all",
            "parent": "admin"
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/view/:id",
        props: {
            "content": "admin.font.single",
            "parent": "admin"
        },
        component: AppContainer
    }
    /* ADD MORE ROUTES HERE */
];

export default appRoutes; 