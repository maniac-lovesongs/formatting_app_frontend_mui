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
            "content": "admin.fonts.id",
            "parent": "admin"
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/view/:fontName/style/:style",
        props: {
            "content": "admin.fonts.chars",
            "parent": "admin"
        },
        component: AppContainer
    }
    /* ADD MORE ROUTES HERE */
];

export default appRoutes; 