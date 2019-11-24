const mongoose = require("mongoose");
const BaseItemModel = require("./BaseItemModel");

// Derived book model
const BookModel = BaseItemModel.discriminator(
    "Book",
    new mongoose.Schema({
        genre: String,
        condition: String, // new/used
        format: String, // audio, hardcover, paperback, eBook
        author: String,
        isbn10: String,
        isbn13: String,
        pages: Number,
        edition: String,
        publishYear: String,
        publisher: String
    })
);

// Initialize collections with dummy data

const dummyBookData = [
    {
        name: "1984",
        author: "Blair, Eric Arthur (George Orwell)",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4d.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4d.jpg"
        },
        genre: "Fiction",
        desc:
            'Nineteen Eighty-Four, often published as 1984, is a dystopian novel by English author George Orwell published in 1949. The novel is set in Airstrip One (formerly known as Great Britain), a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance and public manipulation, dictated by a political system euphemistically named English Socialism (or Ingsoc in the government\'s invented language, Newspeak) under the control of a privileged elite of the Inner Party, that persecutes individualism and independent thinking as "thoughtcrime".',
        pages: 128,
        publishYear: "1949",
        publisher: "S. J. Reginald Saunders & Co. Ltd.",
        rating: 45,
        numRatings: 12,
        price: 12.4
    },
    {
        name: "The Great Gatsby",
        author: "Fitzgerald, F. Scott (Francis Scott Key)",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4e.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4e.jpg"
        },
        genre: "Fiction",
        desc:
            "The Great Gatsby follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan. Considered to be Fitzgerald’s magnum opus, The Great Gatsby explores themes of decadence, idealism, resistance to change, social upheaval, and excess, creating a portrait of the Roaring Twenties that has been described as a cautionary tale regarding the American Dream.",
        pages: 133,
        publishYear: "1926",
        publisher: "",
        rating: 37,
        numRatings: 15,
        price: 34.95
    },
    {
        name: "Ulysses",
        author: "Joyce, James",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4f.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4f.jpg"
        },
        genre: "Fiction",
        desc:
            "Ulysses, arguable Joyce's most famous work, describes a single day in Dublin. It describes the experiences and thoughts of a few individuals, notably Leopold Bloom and Stephen Dedalus, as they interact in different capacities. Joyce has been praised for his innovative writing, using interior monologues and stream of conscious techniques, presented in a diversity of styles. The book gained notoriety for its frank, explicit sexuality, but the casual representation of anti-semitism also makes this a challenging book.",
        pages: 541,
        publishYear: "1937",
        publisher: "The Bodley Head",
        rating: 49,
        numRatings: 181,
        price: 17.79
    },
    {
        name: "Brave New World",
        author: "Huxley, Aldous Leonard",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d50.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d50.jpg"
        },
        genre: "Fiction",
        desc:
            'Brave New World is a novel written in 1931 by Aldous Huxley and published in 1932. Set in London in the year AD 2540 (632 A.F.—"After Ford"—in the book), the novel anticipates developments in reproductive technology, sleep-learning, psychological manipulation, and classical conditioning that combine profoundly to change society.',
        pages: 169,
        publishYear: "1932",
        publisher: "Chatto & Windus",
        rating: 42,
        numRatings: 165,
        price: 42.99
    },
    {
        name: "The Bell Jar",
        author: "Plath, Sylvia",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d51.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d51.jpg"
        },
        genre: "Fiction",
        desc:
            "Plath's only novel, but a famous one, with strong elements of autobiography. It is 1953, and Esther Greenwood has just arrived in New York City: she and eleven others have won a contest, the prize being one month of employment at a famous fashion magazine. But afterwards, depression sets in...",
        pages: 127,
        publishYear: "1963",
        publisher: "Faber and Faber",
        rating: 32,
        numRatings: 17,
        price: 45.9
    },
    {
        name: "The Sojourner",
        author: "Rawlings, Marjorie Kinnan",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d52.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d52.jpg"
        },
        genre: "Fiction",
        desc:
            "The Sojourner is the story of a good man: of the influence of his steady, quiet strength upon others, especially the members of his immediate family, and of what they--characters less strong and less stable--do to him throughout the course of a long life.",
        pages: 283,
        publishYear: "1953",
        publisher: "Charles Scribner's Sons",
        rating: 27,
        numRatings: 6,
        price: 12.95
    },
    {
        name: "Peyton Place",
        author: "Metalious, Grace",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d53.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d53.jpg"
        },
        genre: "Fiction",
        desc:
            "Three women are forced to come to terms with their identity, both as women and as sexual beings, in a small, conservative, gossipy New England town, with recurring themes of hypocrisy, social inequities and class privilege in a tale that includes incest, abortion, adultery, lust and murder. It sold 60,000 copies within the first ten days of its release and remained on the New York Times best seller list for 59 weeks. The novel spawned a franchise that would eventually run through four decades. Twentieth Century-Fox adapted it as a major motion picture in 1957, and Metalious wrote a follow-up novel that was published in 1959, called Return to Peyton Place, which was also filmed in 1961 using the same title. The original 1956 novel was adapted again in 1964, in what became a wildly successful prime time television series for 20th Century Fox Television that ran until 1969.",
        pages: 363,
        publishYear: "1956",
        publisher: "Julian Messner, Inc.",
        rating: 29,
        numRatings: 9,
        price: 26.95
    },
    {
        name: "The Crime at Black Dudley",
        author: "Allingham, Margery",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4c.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d4c.jpg"
        },
        genre: "Fiction",
        desc:
            "When George Abbershaw is invited to Black Dudley Manor for the weekend, he has only one thing on his mind - proposing to Meggie Oliphant. Unfortunately for George, things don't quite go according to plan. A harmless game turns decidedly deadly and suspicions of murder take precedence over matrimony. Trapped in a remote country house with a murderer, George can see no way out. But Albert Campion can.",
        pages: 204,
        publishYear: "1929",
        publisher: "William Heinemann Ltd",
        rating: 19,
        numRatings: 3,
        price: 16.95
    },
    {
        name: "Who Killed the Husband?",
        author: "Footner, Hulbert",
        image: {
            smallUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d54.jpg",
            largeUrl: "https://localhost:4000/images/5dd97bef47bd6649f4b67d54.jpg"
        },
        genre: "Fiction",
        desc:
            "Jules Gartrey, a prominent banker, is killed in his apartment and the police have Al Yohe in their sights. Crime writer and occasional detective Amos Lee Mappin finds himself corralled into investigating by his staff and Yohe’s young bride. Mappin soon finds that this there are plenty of suspects, but Yohe is still at the top of the list.",
        pages: 203,
        publishYear: "1941",
        publisher: "Harper & Brothers Publishers",
        rating: 40,
        numRatings: 11,
        price: 43.0
    }
];

BookModel.countDocuments({}, function(err, c) {
    if (c == 0) {
        dummyBookData.map(item => {
            var bookInstance = new BookModel({
                name: item.name,
                author: item.author,
                image: item.image,
                genre: item.genre,
                desc: item.desc,
                price: item.price,
                rating: item.rating,
                numRatings: item.numRatings
            });
            bookInstance.save(function(err, item) {
                if (err) return console.error(err);
                console.log(item.name + " saved to items collection.");
            });
        });
    }
});

module.exports = BookModel;
