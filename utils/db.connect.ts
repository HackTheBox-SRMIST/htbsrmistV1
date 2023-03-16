import { Db, Collection, MongoClient, MongoError } from "mongodb";

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
            console.log("🔶 Instance was Called!!");
            DBInstance.mongoClient = await this.dbClient.connect();
            DBInstance.db = DBInstance.mongoClient.db(this.dbName);
            console.log(`✅ Connected to MongoDB: ${this.dbName}`);
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

    //Usable Function Component to get data according to Collection Name
    public getCollection = async (collection: string): Promise<Collection> => {
        return DBInstance.db.collection(collection);
    };

    public changeDatabase = async (DBName: string) => {
        try {
            DBInstance.db = DBInstance.mongoClient.db(DBName);
            console.log(`✅ Changed Database to: ${DBName}`);
        } catch (err) {
            console.error("❌ Could not change the database\n%o", err);
            throw MongoError;
        }
    };
}
