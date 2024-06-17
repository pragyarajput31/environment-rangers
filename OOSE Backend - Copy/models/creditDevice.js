// CreditDevice.js

import mongoose from "mongoose";

const creditDeviceSchema = new mongoose.Schema(
  {
    deviceName: {
      type: String,
      required: true,
    },
    creditPoints: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CreditDevice = mongoose.model("CreditDevice", creditDeviceSchema);

export default CreditDevice;
