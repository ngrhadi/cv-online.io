if (process.env.NODE_ENV === "production") {
	module.exports = require("./prod");
} else {
	module.exports = require("./dev");
}

const express = require("express");
// const mongoose = require("mongoose");
const jsonServer = require("json-server");
const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");

const app = express();
const adapter = new fileSync("db.json");
const db = low(adapter);

const articleRouter = require("./routes/article");

const defaultData = {
	article: [
		{
			id: 1,
			title: "Post 1",
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At commodi omnis aperiam inventore quia amet accusantium dicta numquam nisi enim. Perspiciatis dolorum consequatur nisi dolore in? Animi ea voluptatum dicta eos fugiat quisquam nulla quos eligendi ipsa laboriosam? Ratione voluptas, voluptatibus nulla vel dolores vitae aliquam quasi sapiente porro recusandae excepturi earum aut debitis aperiam. Doloremque quisquam, corrupti error, numquam id ea recusandae alias assumenda accusantium cumque laborum, similique voluptatem. Ipsam placeat et temporibus quo rem atque cumque eum neque, mollitia tempore voluptatum, ipsum ullam a incidunt unde. Repellat, molestias sed consequuntur aspernatur unde labore fuga ipsum magnam laboriosam modi quae, vitae deserunt atque, ratione minima magni numquam pariatur vel autem perferendis adipisci reiciendis? Veniam, delectus. Asperiores veritatis officia nobis aspernatur. Eos iste nulla quaerat repudiandae eaque excepturi reprehenderit officia temporibus cum vel? Possimus consequatur eos dicta totam obcaecati officiis iusto debitis expedita! Odio voluptas fuga optio laudantium obcaecati? Iusto ut harum reprehenderit illum quas, quia deserunt veniam ipsam pariatur animi enim eligendi error suscipit alias amet commodi sapiente porro a possimus quos, architecto velit. Ratione, blanditiis minima! Quasi laudantium quaerat dolorum, autem tenetur unde! Nostrum, perferendis. Quisquam dicta nisi laborum, voluptas aspernatur, corrupti, qui vero vitae debitis nesciunt odit explicabo odio illum amet officia expedita earum beatae voluptatem dolorum nihil in ducimus. Id laborum accusantium, omnis magnam, delectus odio officia recusandae perferendis iste reiciendis at quidem nostrum, facilis labore! Laborum, mollitia. Sed quam vero corrupti atque vel temporibus, magni repudiandae fuga officia possimus sint molestiae neque nam doloribus consectetur minus quibusdam illum minima tempore. Iste dolores saepe ut minus molestiae, maxime aut impedit consequuntur quasi sed ea praesentium nesciunt officia architecto modi, corrupti eveniet eius mollitia inventore dolor earum animi reiciendis sint dicta? Quo nemo similique facilis accusantium veritatis fuga eius at, doloremque explicabo quam rerum in accusamus dicta?",
			markdown:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. At commodi omnis aperiam inventore quia amet accusantium dicta numquam nisi enim. Perspiciatis dolorum consequatur nisi dolore in? Animi ea voluptatum dicta eos fugiat quisquam nulla quos eligendi ipsa laboriosam? Ratione voluptas, voluptatibus nulla vel dolores vitae aliquam quasi sapiente porro recusandae excepturi earum aut debitis aperiam. Doloremque quisquam, corrupti error, numquam id ea recusandae alias assumenda accusantium cumque laborum, similique voluptatem. Ipsam placeat et temporibus quo rem atque cumque eum neque, mollitia tempore voluptatum, ipsum ullam a incidunt unde. Repellat, molestias sed consequuntur aspernatur unde labore fuga ipsum magnam laboriosam modi quae, vitae deserunt atque, ratione minima magni numquam pariatur vel autem perferendis adipisci reiciendis? Veniam, delectus. Asperiores veritatis officia nobis aspernatur. Eos iste nulla quaerat repudiandae eaque excepturi reprehenderit officia temporibus cum vel? Possimus consequatur eos dicta totam obcaecati officiis iusto debitis expedita! Odio voluptas fuga optio laudantium obcaecati? Iusto ut harum reprehenderit illum quas, quia deserunt veniam ipsam pariatur animi enim eligendi error suscipit alias amet commodi sapiente porro a possimus quos, architecto velit. Ratione, blanditiis minima! Quasi laudantium quaerat dolorum, autem tenetur unde! Nostrum, perferendis. Quisquam dicta nisi laborum, voluptas aspernatur, corrupti, qui vero vitae debitis nesciunt odit explicabo odio illum amet officia expedita earum beatae voluptatem dolorum nihil in ducimus. Id laborum accusantium, omnis magnam, delectus odio officia recusandae perferendis iste reiciendis at quidem nostrum, facilis labore! Laborum, mollitia. Sed quam vero corrupti atque vel temporibus, magni repudiandae fuga officia possimus sint molestiae neque nam doloribus consectetur minus quibusdam illum minima tempore. Iste dolores saepe ut minus molestiae, maxime aut impedit consequuntur quasi sed ea praesentium nesciunt officia architecto modi, corrupti eveniet eius mollitia inventore dolor earum animi reiciendis sint dicta? Quo nemo similique facilis accusantium veritatis fuga eius at, doloremque explicabo quam rerum in accusamus dicta?",
			created_at: "2016-05-30T23:10:31.000Z",
		},
	],
	comments: [
		{
			id: 1,
			body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem explicabo animi neque doloremque earum et, nihil quis quasi vitae ab quod, nobis quo obcaecati a voluptates sapiente dolores, eum eligendi possimus sit laborum nostrum unde iste. Modi provident at qui.",
			postId: 1,
		},
	],
	profile: {
		name: "ngrhadi",
		email: "adinugraha.ista@yahoo.com",
		github: "https://github.com/ngrhadi",
		phone: "+62878-8628-4789",
		address: "Indramayu, Jawa Barat, Indonesia",
		avatar: "./assets/img/avatar.jpg",
	},
};

db.defaults(defaultData).write();

// mongoose.connect("mongodb://localhost:27017/blog");

app.set("view engine", "ejs");

app.use("/api", jsonServer.router("db.json"));

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
	const articles = [
		{
			id: 1,
			title: "Article 1",
			created_at: new Date(),
			body: "This is the body of article 1",
			comments: [
				{
					id: 1,
					name: "John Doe",
					body: "This is the body of comment 1",
					created_at: new Date(),
				},
				{
					id: 2,
					name: "Jane Doe",
					body: "This is the body of comment 2",
					created_at: new Date(),
				},
			],
		},
		{
			id: 2,
			title: "Article 2",
			created_at: new Date(),
			body: "This is the body of article 2",
			comments: [
				{
					id: 1,
					name: "John Doe",
					body: "This is the body of comment 1",
					created_at: new Date(),
				},
				{
					id: 2,
					name: "Jane Doe",
					body: "This is the body of comment 2",
					created_at: new Date(),
				},
			],
		},
	];
	res.render("articles/index", { article: articles });
});

app.listen(process.env.PORT || 5005);
