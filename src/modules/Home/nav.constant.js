export const leftNavTabs =[
    // {
    //     path : "/home",
    //     label: "nav_home",
    //     iconClassName : "icon-home"
    // },
    // {
    //     path : "/",
    //     label: "nav_communities",
    //     iconClassName : "icon-folder"
    // },
    {
        path: "/home/questions/?show=",
        label: "nav_questions",
        iconClassName: "icon-book-open",
        children : [
          {
            path : 'recent-questions',
            label : 'nav_new_question'
          },
          {
            path : 'most-voted',
            label : 'nav_trending_question'
          },
          {
            path : 'most-visited',
            label : 'nav_must_read_question'
          },
          {
            path : 'most-answered',
            label : 'nav_hot_question'
          }
        ]
    },
    {
        path : "/home/tags",
        label: "nav_tags",
        iconClassName : "icon-tag"
    },
    {
        path : "/home/badges",
        label: "nav_badges",
        iconClassName : "icon-trophy"
    },
    // {
    //     path : "/",
    //     label: "nav_users",
    //     iconClassName : "icon-users"
    // },
    // {
    //     path : "/",
    //     label: "nav_help",
    //     iconClassName : "icon-lifebuoy"
    // },
]