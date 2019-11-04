export default [
    {
        subheader: "administration",
        permissions: [ "roles", "users" ],
        items: [
           {
                permission: "users",
                link: "/users",
                icon: "supervised_user_circle",
                title: 'users',
           }, 
           {
                permission: "roles",
                link: "/rbac",
                icon: "security",
                title: "rbac",
           }, 
        ]
    },
    
    {
        subheader: "system.settings",
        permissions: [ "@" ],
        items: [
           {
                permission: "@",
                link: "/registers",
                icon: "compare_arrows",
                title: 'register.list',
           }, 
        ]
    },

    {
        subheader: "article.articles",
        permissions: [ "descriptions" ],
        items: [
           {
                permission: "descriptions_list",
                link: "/articles",
                icon: "library_books",
                title: "article.articles",
           }, 
           {
                permission: "descriptions_upload",
                link: "/settings",
                icon: "settings",
                title: "article.settings",
           }, 
        ]
    },
]