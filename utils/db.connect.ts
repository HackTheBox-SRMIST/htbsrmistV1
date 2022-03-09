import { MongoClient } from "mongodb";

const MONGODB_URI: string | undefined =
    process.env.MONGODB_URI || "mongodb://localhost:27017/htbsrmist";

export let connectToDatabase = () => {
    const opts: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    return MongoClient.connect(MONGODB_URI, opts).then((client) => {
        return {
            client,
            db: client.db()
        };
    });
};

if (process.env.NODE_ENV !== "production") {
    connectToDatabase = async () => {
        const globalAny: any = global;
        let cached = globalAny.mongo;

        if (!cached) {
            cached = globalAny.mongo = { conn: null, promise: null };
        }

        if (cached.conn) {
            return cached.conn;
        }

        if (!cached.promise) {
            const opts: object = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            cached.promise = MongoClient.connect(MONGODB_URI, opts).then(
                (client) => {
                    return {
                        client,
                        db: client.db()
                    };
                }
            );
        }

        cached.conn = await cached.promise;
        return cached.conn;
    };
}
