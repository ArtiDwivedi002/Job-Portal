import { Webhook } from "svix";
import User from "../models/user.js";
import  connectDB  from '../config/db.js';
export const clerkWebhooks = async (req, res) => {
  try {

     await connectDB();
    
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = evt;


    console.log(" Webhook received:", type);
    console.log(" Payload data:", data);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: ""
        };
        await User.create(userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(" Webhook Error:", err.message);
    res.status(500).json({ success: false, message: "Webhook error" });
  }
};
