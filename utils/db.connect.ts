import { Db, Collection, MongoClient, MongoError } from "mongodb";

// Singleton DBInstance Class
export class DBInstance {
    private static instance: DBInstance;
    private static db: Db;

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
    private constructor() {
        console.log("🔶 Instance was Called!!");
    }

    //Connect Function
    private initialize = async (): Promise<void> => {
        try {
            const connClient = await this.dbClient.connect();
            //console.log(connClient);
            DBInstance.db = connClient.db(this.dbName);
        } catch (err) {
            console.error("❌ Could not connect to MongoDB\n%o", err);
            throw MongoError;
        }
    };

    //Singleton Function Impleent
    public static getInstance = (): DBInstance => {
        if (!DBInstance.instance) {
            DBInstance.instance = new DBInstance();
        }
        return DBInstance.instance;
    };

    //MongoDB Database cache
    private callDb = async (): Promise<Db> => {
        if (!DBInstance.db) {
            await this.initialize();
            console.log(`✅ Connected to MongoDB: ${this.dbName}`);
        }
        return DBInstance.db;
    };

    //Usable Fuction Component to get data according to Collection Name
    public getCollection = async (collection: string): Promise<Collection> => {
        const getDb: Db = await this.callDb();
        return getDb.collection(collection);
    };
}
