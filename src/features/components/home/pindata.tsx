interface location{
    name:string;
    href:string;
    topInPercentage:number;
    leftInPercentage:number;
}

export const Locations:location[]=[
    {
        name:"Speaker",
        href:"/speakers",
        topInPercentage:14,
        leftInPercentage:52,
    },
    {
        name:"Sponsors",
        href:"/sponsors",
        topInPercentage:26,
        leftInPercentage:22,
    },
    {
        name:"Past Events",
        href:"/pastEvents",
        topInPercentage:54,
        leftInPercentage:50,
    },
    {
        name:"Events",
        href:"/events",
        topInPercentage:71,
        leftInPercentage:23,
    },
    {
        name:"About Us",
        href:"/aboutUs",
        topInPercentage:81,
        leftInPercentage:88,
    }
];