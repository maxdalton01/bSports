module.exports = mongoose => {
    const User = mongoose.model(
	"user",
	mongoose.Schema(
	    {
		username: String,
		password: String
	    }
	)
    );

    return User;
};
