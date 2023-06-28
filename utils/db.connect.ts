import { Db, Collection, MongoClient, MongoError } from "mongodb";
require("dotenv-vault-core").config();
//console.log(process.env); // remove this after you've confirmed it working

// Singleton DBInstance Class
export class DBInstance {
    private static instance: DBInstance;
    private static db: Db;
    private static mongoClient: MongoClient;

    //Connection Configutation
    private opts: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxIdleTimeMS: 5000
    };
    //Database Credentials
    private URL: string =
        process.env.MONGODB_URI || "mongodb://localhost:27017/";
    private dbName: string = process.env.DB_NAME || "htbsrmist";
    private dbClient: MongoClient = new MongoClient(this.URL, this.opts);

    //Constructor
    private constructor() {}

    private async initialize() {
        try {
            console.warn("🔶 MongoDB Instance was Called first Time !!");
            DBInstance.mongoClient = await this.dbClient.connect();
            DBInstance.db = DBInstance.mongoClient.db(this.dbName);
            console.warn(`✅ Connected to MongoDB: ${this.dbName}`);
        } catch (err) {
            console.error("❌ Could not connect to MongoDB\n%o", err);
            throw MongoError;
        }
    }

    //Singleton Function Implement
    public static getInstance = async (): Promise<DBInstance> => {
        if (!DBInstance.instance) {
            DBInstance.instance = new DBInstance();
            await DBInstance.instance.initialize();
        }
        return DBInstance.instance;
    };

    public getCollection = async (
        CollName: string,
        DBName?: string
    ): Promise<Collection> => {
        try {
            DBInstance.db = DBInstance.mongoClient.db(DBName || "htbsrmist");
            return DBInstance.db.collection(CollName);
        } catch (err) {
            console.error("❌ Could not change the collection\n%o", err);
            throw MongoError;
        }
    };
}
