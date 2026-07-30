// import { Db, Collection, MongoClient, MongoError } from "mongodb";
// require("dotenv-vault-core").config();
// //console.log(process.env); // remove this after you've confirmed it working

// // Singleton DBInstance Class
// export class DBInstance {
//     private static instance: DBInstance;
//     private static db: Db;
//     private static mongoClient: MongoClient;

//     //Connection Configutation
//     private opts: object = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         maxIdleTimeMS: 5000
//     };

//     //Database Credentials
//     private URL: string =
//         process.env.MONGODB_URI || "mongodb://localhost:27017/";
//     private dbName: string = process.env.DB_NAME || "htbsrmist";
//     private dbClient: MongoClient = new MongoClient(this.URL, this.opts);

//     //Constructor
//     private constructor() {}

//     private async initialize() {
//         try {
//             console.warn("🔶 MongoDB Instance was Called first Time !!");
//             DBInstance.mongoClient = await this.dbClient.connect();
//             DBInstance.db = DBInstance.mongoClient.db(this.dbName);
//             console.warn(`✅ Connected to MongoDB: ${this.dbName}`);
//         } catch (err) {
//             console.error("❌ Could not connect to MongoDB\n%o", err);
//             throw MongoError;
//         }
//     }

//     //Singleton Function Implement
//     public static getInstance = async (): Promise<DBInstance> => {
//         if (!DBInstance.instance) {
//             DBInstance.instance = new DBInstance();
//             await DBInstance.instance.initialize();
//         }
//         return DBInstance.instance;
//     };

//     public getCollection = async (
//         CollName: string,
//         DBName?: string
//     ): Promise<Collection> => {
//         try {
//             DBInstance.db = DBInstance.mongoClient.db(DBName || "htbsrmist");
//             return DBInstance.db.collection(CollName);
//         } catch (err) {
//             console.error("❌ Could not change the collection\n%o", err);
//             throw MongoError;
//         }
//     };
// }

import { Db, Collection, MongoClient, MongoError } from "mongodb";
import dns from "dns";
require("dotenv-vault-core").config();

// ✅ Scope DNS fallback strictly to development (prevents overriding VPC/Cloud DNS in production)
if (process.env.NODE_ENV === "development") {
    try {
        dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    } catch (e) {
        // Ignore if environment overrides DNS configuration
    }
}



export class DBInstance {
    private static instance: DBInstance;
    // ✅ Store the pending init promise so concurrent calls don't race
    private static initPromise: Promise<void> | null = null;

    private db: Db | null = null;           // ✅ instance field, not static
    private mongoClient: MongoClient | null = null; // ✅ instance field, not static

    private URL: string = process.env.MONGODB_URI || "mongodb://localhost:27017/";
    private dbName: string = process.env.DB_NAME || "htbsrmist";

    private opts = {
        maxIdleTimeMS: 10000,
        serverSelectionTimeoutMS: 5000,
    };

    private constructor() {}

    private async initialize(): Promise<void> {
        try {
            console.warn("🔶 MongoDB Instance was Called first Time !!");
            const client = new MongoClient(this.URL, this.opts);
            this.mongoClient = await client.connect();
            this.db = this.mongoClient.db(this.dbName);
            console.warn(`✅ Connected to MongoDB: ${this.dbName}`);
        } catch (err) {
            console.error("❌ Could not connect to MongoDB\n%o", err);
            // ✅ Reset so the next request can retry instead of hanging forever
            DBInstance.instance = null as any;
            DBInstance.initPromise = null;
            throw err;
        }
    }

    public static getInstance = async (): Promise<DBInstance> => {
        if (!DBInstance.instance) {
            DBInstance.instance = new DBInstance();
        }

        // ✅ If initialization is already in progress, wait for it — don't start a second one
        if (!DBInstance.initPromise) {
            DBInstance.initPromise = DBInstance.instance.initialize();
        }

        await DBInstance.initPromise;
        return DBInstance.instance;
    };

    public getCollection = async (
        collName: string,
        dbName?: string
    ): Promise<Collection> => {
        // ✅ Guard: never call .db() on a null client
        if (!this.mongoClient) {
            throw new Error("MongoDB client is not initialized. Call getInstance() first.");
        }

        try {
            const db = this.mongoClient.db(dbName || this.dbName);
            return db.collection(collName);
        } catch (err) {
            console.error("❌ Could not get collection\n%o", err);
            throw err;
        }
    };
}