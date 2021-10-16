function GeoTranslate(data) {
    Geocode.fromAddress(meet.address).then(
        (res) => {
            const { lat, lng } = res.results[0].geometry.location;
            console.log("meet coord", lat, lng)
            setHobbyLocations({
                lat: lat,
                lng: lng
            })
            console.log("setMeetcoord", lat, lng)
            // console.log("setMeetcoord", meetAddress)
        },
        (err) => {
            console.error(err)
        }
    )
}
module.exports = {
    GeoTranslate
};