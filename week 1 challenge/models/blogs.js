const blogs = [
    {
      source: { id: null, name: 'YouTube' },
      author: null,
      title: 'KOTOR Remake In Trouble, Netflix Devil May Cry News, & More | IGN The Weekly Fix - IGN',
      description: null,
      url: 'https://www.youtube.com/watch?v=8UYf_RVtaCE',
      urlToImage: 'https://i.ytimg.com/vi/8UYf_RVtaCE/hqdefault.jpg',
      publishedAt: '2023-10-07T19:30:01Z',
      content: 'Your browser isnt supported anymore. Update it to get the best YouTube experience and our latest features. Learn more\r\n' +
        'Remind me later',
      id: 1
    },
    {
      source: { id: null, name: 'Insider-gaming.com' },
      author: 'Grant Taylor-Hill',
      title: 'Advanced Warfare Weapons Coming to MW3, Leaker Claims - Insider Gaming',
      description: 'It has been claimed by a prominent Call of Duty leaker that Advanced Warfare weapons are coming to Modern Warfare 3 next year.',
      url: 'https://insider-gaming.com/advanced-warfare-weapons-mw3/',
      urlToImage: 'https://insider-gaming.com/wp-content/uploads/2023/10/advanced-warfare.jpg',
      publishedAt: '2023-10-07T19:18:58Z',
      content: 'It has been claimed that a series of weapons taken straight out of Advanced Warfare will be making an appearance in Modern Warfare 3 in 2024. There were four weapons reported in this leak that surfac… [+783 chars]',
      id: 2
    },
    {
      source: { id: null, name: '9to5google.com' },
      author: 'Ben Schoon',
      title: 'Pixel Watch 2 brings a few new watch faces [Gallery] - 9to5Google',
      description: "The Pixel Watch 2 launches with Wear OS 4, as well as bringing a handful of new watch faces for customers. Here's a quick look.",
      url: 'https://9to5google.com/2023/10/07/google-pixel-watch-2-watch-faces/',
      urlToImage: 'https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2023/10/pixel-watch-2-faces-5.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1',
      publishedAt: '2023-10-07T17:35:00Z',
      content: 'Google is launching the Pixel Watch 2 with support for Wear OS 4 out of the box, as well as several new watch faces. Here are all of the new ones.\r\n' +
        'Pictured above, Digital Bold is a watch face that m… [+2055 chars]',
      id: 3
    },
    {
      source: { id: null, name: 'SamMobile' },
      author: 'SamMobile, Adnan Farooqui',
      title: 'SmartThings Head Jaeyeon Jung sheds light on challenges and platform evolution [Interview] - SamMobile - Samsung news',
      description: 'SmartThings has quickly evolved into a potent smart home platform with Samsung devices at the heart of the ecosystem. Its ...',
      url: 'https://www.sammobile.com/news/smartthings-head-jaeyeon-jung-sheds-light-on-challenges-and-platform-evolution-interview/',
      urlToImage: 'https://www.sammobile.com/wp-content/uploads/2023/10/Jaeyeon-Jung-sdc-2023-sammobile-720x405.jpg',
      publishedAt: '2023-10-07T17:22:00Z',
      content: 'SmartThings has quickly evolved into a potent smart home platform with Samsung devices at the heart of the ecosystem. Its embrace of the wider industry protocols such as Matter enables users to choos… [+7381 chars]',
      id: 4
    },
    {
      source: { id: 'the-verge', name: 'The Verge' },
      author: 'Brandon Widder, Antonio G. Di Benedetto',
      title: "Hisense's affordable, HDR-ready U6K TV has hit an all-time low - The Verge",
      description: 'Hisense’s U6K TV is on sale starting at just $398. You can also pick up Nintendo’s new Switch Lite bundle, or get a great deal on Bose’s Noise Cancelling Headphones 700.',
      url: 'https://www.theverge.com/2023/10/7/23906288/hisense-u6k-tv-nintendo-switch-lite-bundle-bose-noise-cancelling-headphones-deal-sale',
      urlToImage: 'https://cdn.vox-cdn.com/thumbor/7oYwfrhOEMl8yGlVzEv9_wP5pIU=/0x0:1000x666/1200x628/filters:focal(500x333:501x334)/cdn.vox-cdn.com/uploads/chorus_asset/file/24983865/2023_Hisense_U6_Series_4K_QLED_Lifestyle_Image.jpg',
      publishedAt: '2023-10-07T17:14:33Z',
      content: 'Hisenses affordable, HDR-ready U6K TV has hit an all-time low\r\n' +
        'Hisenses affordable, HDR-ready U6K TV has hit an all-time low\r\n' +
        ' / You can also snag some sweet Verge merch, an Animal Crossing-themed Sw… [+4374 chars]',
      id: 5
    },
    {
      source: { id: null, name: 'Hackaday' },
      author: 'Kristina Panos',
      title: 'Hats Off To Another Weird Keyboard From Google Japan - Hackaday',
      description: 'As portable as keyboards have gotten, you still need some place to put the thing — some kind of bag for travel, and a flat surface for using it. Well, it doesn’t get much more portable …',
      url: 'https://hackaday.com/2023/10/07/hats-off-to-another-weird-keyboard-from-google-japan/',
      urlToImage: 'https://hackaday.com/wp-content/uploads/2023/10/GCAPS-800.webp',
      publishedAt: '2023-10-07T17:00:00Z',
      content: 'As portable as keyboards have gotten, you still need some place to put the thing — some kind of bag for travel, and a flat surface for using it. Well, it doesn’t get much more portable than a hat key… [+1103 chars]',
      id: 6
    },
    {
      source: { id: null, name: 'ComicBook.com' },
      author: 'Tyler Fischer',
      title: "Nintendo Switch Game Free to Download Before It's Removed From Sale Forever - ComicBook.com",
      description: 'Nintendo fans are running out of time to play this Switch game.',
      url: 'https://comicbook.com/gaming/news/nintendo-switch-exclusive-game-sale-pac-man-99/',
      urlToImage: 'https://sportshub.cbsistatic.com/i/2023/02/10/3d3d1b54-cc83-49af-89c4-954180ea616a/aw2.png?width=1200',
      publishedAt: '2023-10-07T16:07:00Z',
      content: "Nintendo fans on Nintendo Switch, Nintendo Switch Lite, and Nintendo Switch OLED have 24 hours left to download an exclusive game for free before it's removed from sale forever. The game in question … [+2126 chars]",
      id: 7
    },
    {
      source: { id: null, name: 'YouTube' },
      author: null,
      title: 'A Perfectly Reasonable Plan | Adventure is Nigh! - The Liar, The Witch and The Wartorn | S3 EP 6 - The Escapist',
      description: "Adventure Is Nigh: The Liar, The Witch, and the Wartorn Episode 5 is sponsored by Foundry Virtual Tabletop ( https://foundryvtt.com/ ), the software we've us...",   
      url: 'https://www.youtube.com/watch?v=-rU6TBk4Jzo',
      urlToImage: 'https://i.ytimg.com/vi/-rU6TBk4Jzo/maxresdefault.jpg',
      publishedAt: '2023-10-07T16:00:07Z',
      content: null,
      id: 8
    },
    {
      source: { id: null, name: 'YouTube' },
      author: null,
      title: "Call of Duty: Warzone Mobile - Official 'The Maps Are Ready' Trailer - IGN",
      description: 'Call of Duty: Warzone Mobile, the mobile iteration of the hit battle royale, has introduced the maps that will be available in the game. Shoot House, Verdans...',   
      url: 'https://www.youtube.com/watch?v=iLWMTxbY0oU',
      urlToImage: 'https://i.ytimg.com/vi/iLWMTxbY0oU/maxresdefault.jpg',
      publishedAt: '2023-10-07T15:31:11Z',
      content: null,
      id: 9
    },
    {
      source: { id: null, name: 'East Idaho News' },
      author: null,
      title: 'Authorities investigating late night brawl at Ammon restaurant - East Idaho News',
      description: 'AMMON – Law enforcement are investigating a brawl that happened at McDonald’s at 1875 South 25th East in Ammon Friday night. A video sent to us by a witness shows at least half a dozens teens fighting in the lobby of the restaurant. The video is being widely …',
      url: 'https://www.eastidahonews.com/2023/10/authorities-investigating-late-night-brawl-at-ammon-restaurant/',
      urlToImage: 'https://s3.us-west-2.amazonaws.com/assets.eastidahonews.com/wp-content/uploads/2023/10/mcdonalds-brawl-1.jpg',
      publishedAt: '2023-10-07T15:12:00Z',
      content: null,
      id: 10
    },
    {
      source: { id: null, name: 'HODINKEE' },
      author: 'Mark Kauzlarich',
      title: "Watch (And Car) Spotting Rennsport Reunion 7 - The World's Largest Porsche Gathering - HODINKEE",
      description: 'Laguna Seca Raceway had some of the rarest and most unexpected cars in the world, but there were plenty of unexpected watches too.',
      url: 'https://www.hodinkee.com/articles/photo-report-rennsport-reunion-7',
      urlToImage: 'https://hodinkee.imgix.net/uploads/images/dd195d72-0809-4127-b687-6575250cbf6c/Hero_20230929_Rennsport_0571.jpg?ixlib=rails-1.1.0&fm=jpg&q=55&auto=format&usm=12&w=1200&h=630&fit=crop',
      publishedAt: '2023-10-07T15:00:03Z',
      content: "It's also a great place to do some watch spotting. Watch shots are much easier to grab than good, clean photos of the cars because of the mass of people. In fact, that's why I focused so much on all … [+610 chars]",
      id: 11
    },
    {
      source: { id: null, name: 'YouTube' },
      author: null,
      title: 'Firearms Expert Rates M16/M4/AR-15s in Games - GameSpot',
      description: 'Jonathan Ferguson, a weapons expert and Keeper of Firearms & Artillery at the Royal Armouries, rates a variety of M16s, M4s, and AR-15s in games, including E...',   
      url: 'https://www.youtube.com/watch?v=vs_8_TpLdkw',
      urlToImage: 'https://i.ytimg.com/vi/vs_8_TpLdkw/maxresdefault.jpg',
      publishedAt: '2023-10-07T14:00:42Z',
      content: null,
      id: 12
    },
    {
      source: { id: null, name: 'Pure Xbox' },
      author: 'Fraser Gilbert',
      title: "Here's What Might Be Leaving Xbox Game Pass In November 2023 - Pure Xbox",
      description: 'Some early predictions!',
      url: 'https://www.purexbox.com/news/2023/10/heres-what-might-be-leaving-xbox-game-pass-in-november-2023',
      urlToImage: 'https://images.purexbox.com/4324eb5d5112c/1280x720.jpg',
      publishedAt: '2023-10-07T13:30:00Z',
      content: 'Image: Gungrave G.O.R.E\r\n' +
        "What's leaving Xbox Game Pass in November 2023? Well, Microsoft hasn't confirmed anything just yet, but based on some games that were added to the service this time last year… [+3139 chars]",
      id: 13
    },
    {
      source: { id: null, name: 'Videocardz.com' },
      author: null,
      title: 'AMD Ryzen 7 7800X3D 8-core gaming CPU is currently available for $349 - VideoCardz.com',
      description: 'AMD’s best gaming CPU drops by $100 AMD Ryzen 7 7800X3D, featuring 8 cores, has been recommended by many reviewers as the best gaming CPU.  The 7800X3D brings together the latest Zen4 microarchitecture from AMD and the innovative 3D V-Cache technology, often …',
      url: 'https://videocardz.com/newz/amd-ryzen-7-7800x3d-8-core-gaming-cpu-is-currently-available-for-349',
      urlToImage: 'https://cdn.videocardz.com/1/2023/10/7800X3D-HERO-NEWEGG.jpg',
      publishedAt: '2023-10-07T13:22:00Z',
      content: 'AMD Ryzen 7 7800X3D, featuring 8 cores, has been recommended by many reviewers as the best gaming CPU. \r\n' +
        'The 7800X3D brings together the latest Zen4 microarchitecture from AMD and the innovative 3D V… [+1744 chars]',
      id: 14
    },
    {
      source: { id: null, name: 'Forbes' },
      author: 'Paul Tassi',
      title: 'Naughty Dog, Do Not Remaster ‘The Last Of Us Part II,’ Come On - Forbes',
      description: 'There are now rumblings that Naughty Dog’s next project, in addition to its flailing Last of Us Factions multiplayer game, is a remaster of The Last of Us Part II.',
      url: 'https://www.forbes.com/sites/paultassi/2023/10/07/naughty-dog-do-not-remaster-the-last-of-us-part-ii-come-on/',
      urlToImage: 'https://imageio.forbes.com/specials-images/imageserve/652159169cee3eba3a76e674/0x0.jpg?format=jpg&width=1200',
      publishedAt: '2023-10-07T13:14:32Z',
      content: 'The Last of Us Part 2\r\n' +
        'Naughty Dog\r\n' +
        'There are now rumblings that Naughty Dogs next project, in addition to its flailing Last of Us Factions multiplayer game, is a remaster of The Last of Us Part II.\r… [+2166 chars]',
      id: 15
    },
    {
      source: { id: 'the-wall-street-journal', name: 'The Wall Street Journal' },
      author: 'Lisa Bannon',
      title: 'Artificial Empathy Is Coming. Are You Ready for Emotions From AI? - The Wall Street Journal',
      description: 'Artificial Intelligence is getting smart enough to express and measure human empathy. Here’s how the new technology could change healthcare, customer service—and your performance review',
      url: 'https://www.wsj.com/tech/ai/ai-empathy-business-applications-technology-fc41aea2',
      urlToImage: 'https://images.wsj.net/im-864407/social',
      publishedAt: '2023-10-07T13:02:00Z',
      content: null,
      id: 16
    },
    {
      source: { id: null, name: 'Forbes' },
      author: 'Paul Tassi',
      title: 'Diablo 4’s Microtransaction Cosmetic Issues Will Remain In Season 2, It Seems - Forbes',
      description: 'Diablo 4 famously did a whole blog post about how its in-game armor sets would be just as cool as the store ones. This was largely true at launch. This has been the opposite of true for seasons, and that appears to include season 2 now.',
      url: 'https://www.forbes.com/sites/paultassi/2023/10/07/diablo-4s-microtransaction-cosmetic-issues-will-remain-in-season-2-it-seems/',
      urlToImage: 'https://imageio.forbes.com/specials-images/imageserve/652154c8c907ff6303ea765e/0x0.jpg?format=jpg&width=1200',
      publishedAt: '2023-10-07T12:59:19Z',
      content: 'Diablo 4\r\n' +
        'Blizzard\r\n' +
        'Diablo 4s Season of Blood launches in less than a week. It looks to introduce a season much larger than its first one, given that it wasnt developed alongside the main game. It wi… [+3091 chars]',
      id: 17
    },
    {
      source: { id: null, name: 'PhoneArena' },
      author: 'Martin Filipov',
      title: 'iPhone 15 or iPhone 14 Pro: Shocking but true - going "Pro" is the biggest mistake you can make - PhoneArena',
      description: "People who bought last year’s Pro iPhone might feel robbed. In historic event for Apple, the cheapest new iPhone (15) is better than last year's Pro model.",        
      url: 'https://www.phonearena.com/news/iphone-15-or-iphone-14-pro-shocking-but-true-going-pro-biggest-mistake-you-can-make_id151300',
      urlToImage: 'https://m-cdn.phonearena.com/images/article/151300-wide-two_1200/iPhone-15-or-iPhone-14-Pro-Shocking-but-true---going-Pro-is-the-biggest-mistake-you-can-make.jpg',   
      publishedAt: '2023-10-07T12:01:32Z',
      content: 'Adding to the much better in-hand feel, the iPhone 15 is now gently curved on all sides, front and back. Again, this is a tiny detail, which goes a long, long way in making the phone feel better (unl… [+2612 chars]',
      id: 18
    },
    {
      source: { id: null, name: 'Android Police' },
      author: 'Will Sattelberg',
      title: 'Weekend poll: Did you preorder a Google Pixel 8 or Pixel Watch 2? - Android Police',
      description: 'Google has some shiny new hardware — what did you buy?',
      url: 'https://www.androidpolice.com/weekend-poll-did-you-preorder-a-google-pixel-8-or-pixel-watch-2/',
      urlToImage: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/wm/2023/10/pixel-8-pixel-8-pro-hands-on-event-02.jpg',
      publishedAt: '2023-10-07T12:00:00Z',
      content: "And just like that, yet another Google hype cycle has been put out to pasture. With the company's latest Made By Google event having wrapped up on Wednesday, we now know practically everything there … [+1961 chars]",
      id: 19
    },
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'Reece Rogers',
      title: 'How to Use Google Bard to Find Your Stuff in Gmail and Docs - WIRED',
      description: 'The new extensions released for Google’s chatbot are clunky, but they might be helpful with a hefty dose of patience.',
      url: 'https://www.wired.com/story/how-to-use-google-bard-gmail-docs-ai/',
      urlToImage: 'https://media.wired.com/photos/6520380bc804fbff22818d45/191:100/w_1280,c_limit/How-to-Use-Google-Bard%E2%80%99s-New-Extensions-for-Gmail-and-Docs-GettyImages-1367848576.jpg',
      publishedAt: '2023-10-07T11:00:00Z',
      content: 'Google recently rolled out multiple updates to Bard, its AI chatbot. The new features include extensions that connect Bard to more aspects of Googles portfolio, like Gmail, Docs, and YouTube. The com… [+2676 chars]',
      id: 20
    }
  ];


  module.exports = {
    blogs
  };