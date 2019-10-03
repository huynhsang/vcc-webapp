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
        path: "/home/questions",
        label: "nav_questions",
        iconClassName: "icon-book-open",
        children : [
          {
            path : '/?show=recent-questions',
            label : 'nav_new_question'
          },
          {
            path : '/?show=most-voted',
            label : 'nav_trending_question'
          },
          {
            path : '/?show=most-visited',
            label : 'nav_must_read_question'
          },
          {
            path : '/?show=most-answered',
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