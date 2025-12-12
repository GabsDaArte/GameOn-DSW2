// Banco de imagens improvisado
export const getGameImage = (gameName) => {
    const images = {
        "League of Legends": "https://cdn2.unrealengine.com/26br-the-hunt-is-on-1920x1080-333010732.jpg",
        "Valorant": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072436ec272572/61dc0c6348633c3e85746b41/VALORANT_Jett_1920x1080.jpg",
        "Overwatch 2": "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltc46e9fb54316335a/62ea8c5e692484545041065e/overwatch2-screenshot-01.png",
        "Counter-Strike 2": "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg",
        "Elden Ring": "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg",
        "Minecraft": "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1k7bwmZ5uqBR.jpg",
        // Imagem padrão caso o jogo não esteja na lista
        "default": "https://wallpapers.com/images/featured/gaming-background-xms19j4q00n27v47.jpg"
    };

    return images[gameName] || images["default"];
};