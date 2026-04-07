export class EnvironmentConfiguration {
    public baseURL!: string;
    public env  = process.env.NODE_ENV || "test";
    public role = process.env.ROLE || 'admin';

    constructor(
        public loginUsername?: string, 
        public loginPassword?: string) 
        {
        if (process.env.NODE_ENV?.includes("test"))
            this.baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/";
          else if (process.env.NODE_ENV === "production") {
            this.baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/";
        }
      }
    }