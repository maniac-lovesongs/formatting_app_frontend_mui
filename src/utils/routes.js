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
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/view/all",
        props: {
            "content": "admin.fonts.all",
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },
    {
        path: "/admin/roles/view/all",
        props: {
            "content": "admin.roles.all",
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/create",
        props: {
            "content": "admin.fonts.create",
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/view/:id/name/:fontName/",
        props: {
            "content": "admin.fonts.create",
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },   
    {
        path: "/admin/fonts/view/:id",
        props: {
            "content": "admin.fonts.id",
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },
    {
        path: "/admin/fonts/view/:fontNameParam/style/:styleParam",
        props: {
            "content": "admin.fonts.chars",
            "parent": "admin",
            "protected": true,
            "required_role": 1
        },
        component: AppContainer
    },
    {
        path: "/auth/signin",
        props: {
            "content": "auth.signin",
            "parent": "auth"
        },
        component: AppContainer
    },
    {
        path: "/auth/signup",
        props: {
            "content": "auth.signup",
            "parent": "auth"
        },
        component: AppContainer
    }
    /* ADD MORE ROUTES HERE */
];

export default appRoutes; 