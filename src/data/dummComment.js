export const dummyComments = [
  {
    id: "asdf-ghjk-l123-4567",
    user: "John",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vestibulum ante nibh, nec mollis est tempor sed.",
    replies: [
      {
        id: "qwer-tyui-iop1-2345",
        user: "Bobby",
        text: "Morbi vestibulum elit vel libero tristique molestie. Aenean congue arcu sapien.",
        replies: [],
        createdAt: new Date(Date.now() - 30 * 1000).toISOString(),
        replyTo: "John",
      },
    ],
    createdAt: new Date(Date.now() - 60 * 1000).toISOString(),
  },
  {
    id: "zxcv-bnm,-1234-5678",
    user: "Jenny",
    text: "Curabitur lacinia quis elit vitae tincidunt. Phasellus facilisis molestie dui sed semper.",
    replies: [],
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
];
