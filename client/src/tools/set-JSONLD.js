import appData from "../data";
import {titleConvertToLink} from "./title-convert-to-link";

function setSummaryPageJSONLD(index) {
    const el = document.getElementById('dynamicJSONLD');
    const JSONLD = {
        '@context': 'https://schema.org',
        '@type': 'ItemList'
    };
    const listArray = [];
    // listItems
    appData.webAppProjectData.map((i, index) => {
        const obj = {
            '@type': 'ListItem',
            'position': index + 1,
            'url': `https://www.xiaoxihome.com${titleConvertToLink(i.title)}`
        };
        listArray.push(obj);
        return false;
    });

    JSONLD.itemListElement = listArray;
    el.innerHTML = JSON.stringify(JSONLD);
}

function setDetailPageJSONLD(index) {
    const el = document.getElementById('dynamicJSONLD');
    const data = appData.webAppProjectData[index];
    const JSONLD = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'author': {
            "@type": "Organization",
            "name": "Xiaoxihome"
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Xiaoxihome',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://www.xiaoxihome.com/favicon.ico'
            }
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': appData.webAppProjectData[0].link,
        },
        'image': [
            'https://xiaoxihome.s3.us-east-2.amazonaws.com/galleryphoto/astro/astro2.jpg'
        ],
        'datePublished': '2019-07-01',
        'headline': data.title,
        'description': data.summary,
    };
    el.innerHTML = JSON.stringify(JSONLD);
}

function resetJSONLD() {
    const el = document.getElementById('dynamicJSONLD');
    el.innerHTML = '';
}

export { setSummaryPageJSONLD, setDetailPageJSONLD, resetJSONLD };