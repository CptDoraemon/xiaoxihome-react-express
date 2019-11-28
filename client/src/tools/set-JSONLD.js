import webAppProjectData from "../app/webAppProjectData";

function setJSONLD() {
    const el = document.getElementById('dynamicJSONLD');
    const JSONLD = {
        '@context': 'https://schema.org',
        '@type': 'ItemList'
    };
    const listArray = webAppProjectData.map((i, index) => {
        return {
            '@type': 'ListItem',
            'position': index + 1,
            'item' : {
                '@type': 'NewsArticle',
                'author': {
                    "@type": "Organization",
                    "name": "Xiaoxihome"
                },
                'headline': i.title,
                'description': i.summary,
                'url': i.link
            }
        }
    });

    JSONLD.itemListElement = listArray;
    el.innerHTML = JSON.stringify(JSONLD);
}

export { setJSONLD };