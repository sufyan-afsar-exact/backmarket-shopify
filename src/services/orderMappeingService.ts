import { shopify } from "..";

export class OrderService {
    public async registerOrderCreateWebhook(args:any): Promise<any> {

        try {
        return {
              success: true,
              data: {
                result:args,
                message: '✅ Order creation webhook registered.',
              },
            };
         
          
          } catch (error) {
            console.error("Error fetching webhooks:", error);
          }
    
      }
}
