import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("BloodConnect");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      roll: { defaultValue: "Donor" },
      status: { defaultValue: "Active" },
      bloodGroup: { type: "string", required: false },
      district: { type: "string", required: false },
      upazila: { type: "string", required: false },
      phone: { type: "string", required: false },
      avatarUrl: { type: "string", required: false },
    },
  },
  hooks: {
    onSignUp: async (ctx) => {
      const metadata = ctx.body?.metadata;
      
      if (metadata && ctx.user?.email) {
        const updateFields = {};
        if (metadata.bloodGroup) updateFields.bloodGroup = metadata.bloodGroup;
        if (metadata.district) updateFields.district = metadata.district;
        if (metadata.upazila) updateFields.upazila = metadata.upazila;
        if (metadata.phone) updateFields.phone = metadata.phone;
        if (metadata.avatarUrl) {
          updateFields.image = metadata.avatarUrl;
          updateFields.avatarUrl = metadata.avatarUrl;
        }

        if (Object.keys(updateFields).length > 0) {
          const result = await db
            .collection("user")
            .updateOne({ email: ctx.user.email }, { $set: updateFields });
        }
      }
    },
  },
});
