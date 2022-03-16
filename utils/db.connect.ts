import { Collection, MongoClient, MongoError } from "mongodb";

// Singleton DBInstance Class
export class DBInstance {
    private static instance: DBInstance;

    //Connection Configutation
    private opts: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
            await this.dbClient.connect();
            console.log("✅ Connected to MongoDB");
        } catch (err) {
            console.error("❌ Could not connect to MongoDB\n%o", err);
            throw MongoError;
        } finally {
            () => this.dbClient.close();
        }
    };

    //Singleton Function Impleent
    public static getInstance = (): DBInstance => {
        if (!DBInstance.instance) {
            DBInstance.instance = new DBInstance();
        }
        return DBInstance.instance;
    };

    //Usable Fuction Component to get data according to Collection Name
    public getCollection = async (collection: string): Promise<Collection> => {
        await this.initialize();
        return this.dbClient.db(this.dbName).collection(collection);
    };
}
