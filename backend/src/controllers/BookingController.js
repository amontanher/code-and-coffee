const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const {user_id} = req.headers;
        const {spot_id} = req.params;
        const {date} = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSpotSocket = req.connectedUsers[booking.spot.user];

        if(ownerSpotSocket){
            req.io.to(ownerSpotSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};