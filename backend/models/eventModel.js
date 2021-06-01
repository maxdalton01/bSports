module.exports = mongoose => {
    const Event = mongoose.model(
	"event",
	mongoose.Schema(
	    {
			sport: String,
			location: String,
	        attendees: Number,
			description: String,
			date: Date,
			listAttendees: [String],
			creator: String,
			wantedAttendees: Number
	    }
	)
    );

    return Event;
};
