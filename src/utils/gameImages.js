export const getGameImage = (gameName) => {
    const name = gameName ? gameName.trim() : "default";

    const images = {
        "Counter-Strike 2": "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
        "The Witcher 3": "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg",
        "Elden Ring": "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
        "Apex Legends": "https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg",
        "Dota 2": "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg",
        "Back 4 Blood": "https://cdn.akamai.steamstatic.com/steam/apps/924970/header.jpg",
        "Horizon Forbidden West": "https://cdn.akamai.steamstatic.com/steam/apps/2420110/header.jpg",
        "Ghostwire: Tokyo": "https://cdn.akamai.steamstatic.com/steam/apps/1475810/header.jpg",
        "Dying Light 2": "https://cdn.akamai.steamstatic.com/steam/apps/534380/header.jpg",
        "Call of Duty: Warzone": "https://cdn.akamai.steamstatic.com/steam/apps/1962660/header.jpg",
        "Rocket League": "https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg",
        "Among Us": "https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg",
        "Stardew Valley": "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg",
        "Overwatch 2": "https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg",
        "Valorant": "https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-892482f9cbec5827c7c4989d7feb2bf1",
        "Minecraft": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a",
        "Fortnite": "https://i.ytimg.com/vi/adGdyCdvKz4/maxresdefault.jpg",
        "League of Legends": "https://s2.glbimg.com/cg0Yf7KUqt4wFsxoPyeAIUhZMv8=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/Y/L/lIgTd8SVCHPu8lGXmbJg/novo-logo-league-of-legends.jpg",

        "default": "https://wallpapers.com/images/hd/gaming-background-xms19j4q00n27v47.jpg"
    };

    return images[name] || images["default"];
};