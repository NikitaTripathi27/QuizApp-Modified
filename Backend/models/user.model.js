const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: value => validator.isEmail(value, { all_lowercase: true }),
    },
    password: {
      type: String,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

/**
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email: email });
  console.log(user,"nik")
  return user;
};


/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};


/**
 * @typedef User
 */

const User = mongoose.model('Users', userSchema);

module.exports ={ User};