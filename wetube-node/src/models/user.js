import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    socialLogin: { type: Boolean, default: false },
    avatarUrl: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    location: { type: String },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// this를 써야 해서 화살표 함수 대신 function 사용
UserSchema.pre("save", async function () {
    if (this.isModified("password") && this.password) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const User = mongoose.model("User", UserSchema);

export default User;
