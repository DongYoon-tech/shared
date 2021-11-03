function GeoTranslate(data) {
    Geocode.fromAddress(meet.address).then(
        (res) => {
            const { lat, lng } = res.results[0].geometry.location;
            setHobbyLocations({
                lat: lat,
                lng: lng
            })
        },
        (err) => {
            console.error(err)
        }
    )
}
module.exports = {
    GeoTranslate
};