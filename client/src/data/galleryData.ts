export interface Album {
    albumName: string,
    photos: Array<Photo>
}

export interface Photo {
    description: string,
    link: string
}

interface AlbumPreview {
    albumName: string,
    link: string
}

export const galleryPreviewData: Array<AlbumPreview> = [
    {
        albumName: 'Toronto',
        // link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/toronto.png',
        link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto1.jpg'
    },
    {
        albumName: 'Canada',
        // link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/canada.jpg',
        link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada1.jpg'
    },
    {
        albumName: 'Banff',
        // link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/banff.png',
        link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff1.jpg'
    },
    {
        albumName: 'Hometown',
        // link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/hometown.jpg',
        link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-1.jpg'
    },
    {
        albumName: 'YorkU',
        // link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/yorku.png',
        link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku1.jpg'
    },
    {
        albumName: 'Astro',
        link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/astro/astro1.jpg'
    },
];

const galleryData: Array<Album> = [
    {
        albumName: 'Toronto',
        photos: [
            {
                description: 'Toronto\'s inner harbour in a freezing cold windy day',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto1.jpg'
            },
            {
                description: 'Summer sunset',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto2.jpg'
            },
            {
                description: 'Waterfront',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto3.jpg'
            },
            {
                description: 'It was -20 Celsius that day',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto4.jpg'
            },
            {
                description: 'View of Toronto downtown from CN Tower',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto5.jpg'
            },
            {
                description: 'City hall and merry Christmas!',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/toronto/toronto6.jpg'
            }
        ]
    },
    {
        albumName: 'Canada',
        photos: [
            {
                description: 'Quebec City',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada1.jpg'
            },
            {
                description: 'Night',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada2.jpg'
            },
            {
                description: 'Happy New Year at Niagara Falls',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada3.jpg'
            },
            {
                description: 'New Year Eve at Niagara Falls',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada4.jpg'
            },
            {
                description: 'Greetings to Detroit from Windsor',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada5.jpg'
            },
            {
                description: 'Parliament Hill Ottawa',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada6.jpg'
            },
            {
                description: 'Queen Victoria Statue at Queen\'s Park',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada7.jpg'
            },
            {
                description: 'Fisgard Lighthouse at Victoria',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada8.jpg'
            },
            {
                description: 'Kingston',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada9.jpg'
            },
            {
                description: 'Notre-Dame Basilica Montreal',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada10.jpg'
            },
            {
                description: 'View of Montreal downtown from Mount Royal Lookout',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/canada/canada11.jpg'
            }
        ]
    },
    {
        albumName: 'Banff',
        photos: [
            {
                description: 'Banff Gondola',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff1.jpg'
            },
            {
                description: 'Night in the woods',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff2.jpg'
            },
            {
                description: 'Athabasca Falls',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff3.jpg'
            },
            {
                description: 'Sulphur Mountain',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff4.jpg'
            },
            {
                description: 'Jasper SkyTram & Whistlers Peak',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff5.jpg'
            },
            {
                description: 'Somewhere along Hwy 93',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff6.jpg'
            },
            {
                description: 'After rain',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff7.jpg'
            },
            {
                description: 'On Jasper Mountain',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff8.jpg'
            },
            {
                description: 'Castle Mountain',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff9.jpg'
            },
            {
                description: 'Glacier Skywalk',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff10.jpg'
            },
            {
                description: 'Columbia Icefield',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/banff/banff11.jpg'
            }
        ]
    },
    {
        albumName: 'Hometown',
        photos: [
            {
                description: 'Wuhan Yangtze River Bridge, 2019',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-1.jpg'
            },
            {
                description: 'Wuhan Yangtze River Bridge and the old Wuchang downtown',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-2.jpg'
            },
            {
                description: 'Yellow Crane Tower, it\'s said to be built initially in AD 223',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-3.jpg'
            },
            {
                description: 'Yellow Crane Tower',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-4.jpg'
            },
            {
                description: 'Yellow Crane Tower',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-5.jpg'
            },
            {
                description: 'Yingwuzhou Yangtze River Bridge',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-6.jpg'
            },
            {
                description: 'Yingwuzhou Yangtze River Bridge',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-7.jpg'
            },
            {
                description: 'Yingwuzhou Yangtze River Bridge',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-8.jpg'
            },
            {
                description: 'Yingwuzhou Yangtze River Bridge',
                link: 'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/hometown/wuhan-2019-9.jpg'
            },
            {
                description: 'Wuhan Yangtze River Bridge, first road and rail bridge on Yangtze River, 2014',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/hometown/hometown1.jpg'
            },
            {
                description: 'Wuhan Waterfront',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/hometown/hometown2.jpg'
            },
            {
                description: 'The old Custom House',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/hometown/hometown3.jpg'
            },
            {
                description: '...',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/hometown/hometown4.jpg'
            },
            {
                description: 'Yangtze River',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/hometown/hometown5.jpg'
            }
        ]
    },
    {
        albumName: 'YorkU',
        photos: [
            {
                description: 'Bergeron Centre',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku1.jpg'
            },
            {
                description: 'The hall outside of Economics Department',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku2.jpg'
            },
            {
                description: 'The Vari Hall',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku3.jpg'
            },
            {
                description: 'Accolade Building West',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku4.jpg'
            },
            {
                description: 'The Vari Hall',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku5.jpg'
            },
            {
                description: 'Foggy Autumn',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku6.jpg'
            },
            {
                description: 'Accolade Building East',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku7.jpg'
            },
            {
                description: 'The fall colors',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/yorku/yorku8.jpg'
            }
        ]
    },
    {
        albumName: 'Astro',
        photos: [
            {
                description: 'Part of Orion Constellation',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/astro/astro1.jpg'
            },
            {
                description: 'The Singing Sands Beach',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/astro/astro2.jpg'
            },
            {
                description: 'Long Point National Wildlife Area',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/astro/astro3.jpg'
            },
            {
                description: 'M16 Eagle Nebula & M17 Omega Nebula',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/astro/astro4.jpg'
            },
            {
                description: 'Andromeda Galaxy',
                link: 'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/astro/astro5.jpg'
            }
        ]
    }
];

export default galleryData;
