export const extractDomain = (email) => {
    const domainRegex = /@([^@]+)$/
    const match = email.match(domainRegex)

    if (match) {
        return match[1]
    }

    return null
}
