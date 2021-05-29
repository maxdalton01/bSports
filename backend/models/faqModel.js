module.exports = mongoose => {
    const Faq = mongoose.model(
	"faq",
	mongoose.Schema(
	    {
			question: String,
            response: String
	    }
	)
    );

    return Faq;
};