export const data = {
  timestamp: getDateDaysAgo(0),
  userLoggedIn: "albertmata",
  suggestedFollows: [
    {
      username: "stone",
      premium: true,
      avatar: "https://picsum.photos/400?25827c0c-a7a1-4779-8187-4c70abf01cd7",
    },
    {
      username: "WongMia",
      premium: false,
      avatar: "https://picsum.photos/400?9ac66e5e-dbe3-401a-b2bc-b1dd62495700",
    },
    {
      username: "priya",
      premium: false,
      avatar: "https://picsum.photos/400?ae5022aa-c099-4f65-b6ab-ad9c22afc298",
    },
    {
      username: "liaAang",
      premium: false,
      avatar: "https://picsum.photos/400?d54b66ac-3078-466b-94f5-af2de155f5fe",
    },
    {
      username: "ithya21",
      premium: true,
      avatar: "https://picsum.photos/400?fd5072d1-fd16-408b-92d2-9eaaf923c057",
    },
    {
      username: "frenchzyn",
      premium: false,
      avatar: "https://picsum.photos/400?68c6069c-136f-43d3-9052-d18a28ba3a16",
    },
    {
      username: "simoes",
      premium: true,
      avatar: "https://picsum.photos/400?5b5b6dad-3241-41fb-b93f-b61abd5460d9",
    },
    {
      username: "cirtueixxx",
      premium: false,
      avatar: "https://picsum.photos/400?11d0bf1e-54df-4764-bce9-42c99823fe5a",
    },
    {
      username: "LeeWalsh",
      premium: false,
      avatar: "https://picsum.photos/400?862e8fa4-b498-4434-8f4a-dbed39a96787",
    },
    {
      username: "stanbrige99",
      premium: false,
      avatar: "https://picsum.photos/400?c46372b1-87ad-44a1-a0c8-789b687a6ac2",
    },
  ],
  stories: [
    {
      id: "3e6cc618-d20f-431f-b20a-13b921fee991",
      picture:
        "https://picsum.photos/1000/1000?cc61cfbf-c980-4a2a-b0fe-2b48f361bb7f",
      username: "citrix78",
      timestamp: getDateDaysAgo(0),
      comments: [
        {
          id: "56de6179-61ae-4bcc-af32-c19f149dd5ed",
          username: "citrix78",
          comment: "I really hope you guys like this photo!",
          timestamp: getDateDaysAgo(0),
        },
        {
          id: "6ef94ab9-4d2a-4ddc-ab87-d68265c13566",
          username: "haterish",
          comment: "It totally sucks!!! ðŸ’©",
          timestamp: getDateDaysAgo(0),
        },
        {
          id: "9296fef5-65b1-4b1e-9cc1-d90e4dc25f72",
          username: "bourinhish",
          comment: "Yeah! It's really disgusting ðŸ¤®",
          timestamp: getDateDaysAgo(0),
        },
        {
          id: "44bf93c3-4b24-4cf9-ba58-86cc310cafc4",
          username: "awesomeguy",
          comment:
            "You guys don't really know what you talking about, this photo is soooo coool!!!1one1 ðŸŒˆ ðŸž ðŸ¥°",
          timestamp: getDateDaysAgo(0),
        },
        {
          id: "f4bba915-1612-4ebb-93ae-f74604b74743",
          username: "citrix78",
          comment:
            "Thank you very much @awesomeguy. I put a lot of love in that picture and then these guys saying those nasty things... I dunno, maybe it's time to look for a different social network, there is this new kid on the block, Instagram or something, maybe I'll give it a go!",
          timestamp: getDateDaysAgo(0),
        },
      ],
    },
    {
      id: "d73f3ac0-5f50-410f-bb8b-29e33fb82251",
      picture:
        "https://picsum.photos/1000/1000?261c9329-186f-4af9-90c7-88cff645ad8c",
      username: "randomGuy",
      timestamp: getDateDaysAgo(1),
      comments: [],
    },
    {
      id: "853bcff1-3292-4618-b36b-d6d830a4d61d",
      picture:
        "https://picsum.photos/1000/1000?2ed9e81c-ce0b-4e3f-97e6-7f245ef3bdbe",
      username: "happiness",
      timestamp: getDateDaysAgo(2),
      comments: [
        {
          id: "19f49c17-d578-44d5-80a2-d7a0c85c7ebe",
          username: "haterish",
          comment: "Worst picture ever! ðŸ’©ðŸ’©ðŸ’©",
          timestamp: getDateDaysAgo(1),
        },
        {
          id: "861f9b26-9a04-44f0-bd48-cedc03ac05dd",
          username: "peaceandlove",
          comment:
            "You better watch out. You better not cry. Better not pout. I'm telling you why. Santa Claus is coming to town. He's making a list. And checking it twice. Gonna find out who's naughty and nice!",
          timestamp: getDateDaysAgo(0),
        },
      ],
    },
    {
      id: "5ece4231-1581-4cce-84ab-d0b423a7f390",
      picture:
        "https://picsum.photos/1000/1000?1f4db86d-a445-4543-afd5-b654e61a78e0",
      username: "lucyDiamond",
      timestamp: getDateDaysAgo(3),
      comments: [
        {
          id: "f45850bd-ac1a-4b4b-97e5-4879f10a8abe",
          username: "citrix78",
          comment: "What a nice photo! Congratulations! ",
          timestamp: getDateDaysAgo(3),
        },
      ],
    },
    {
      id: "cc29d1a5-bb5a-473b-9208-928b051c92f1",
      picture:
        "https://picsum.photos/1000/1000?0d81a2de-d1c7-4a35-9228-1f8f80a6381f",
      username: "trumpyjudd",
      timestamp: getDateDaysAgo(7),
      comments: [],
    },
  ],
};

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
