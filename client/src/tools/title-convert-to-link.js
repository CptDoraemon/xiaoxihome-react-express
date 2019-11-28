function titleConvertToLink(titleString) {
    let formattedString = titleString.toLowerCase().split(' ').join('-').replace('/', '');
    return `/${formattedString}`;
}

export { titleConvertToLink };