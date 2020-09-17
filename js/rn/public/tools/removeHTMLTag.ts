export function removeHTMLTag(data: string ) {
    const regex = /(<([^>]+)>)/ig
    return data.replace(regex, '')
}
