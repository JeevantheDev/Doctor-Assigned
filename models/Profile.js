const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    clinic: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    timing: {
      type: String,
      required: true
    },
    status: {
        type: String,
        required: true
    },
    specialists: {
        type: String
    },
    ruppess: {
        type: String
    },
    bio: {
        type: String
    },
    patients: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        bookingId: {
          type: Number
        },
        patientname: {
            type: String,
            required: true
        },
        fathername: {
          type: String,
        },
        status: {
            type: String,
        },
        age: {
            type: Number,

        },
        date: {
          type: Date,
        },
        description: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
      }
    ],
    review: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        text: {
          type: String,
          require: true
        },
        name: {
          type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
      }
    ],
    experience : [
        {
            position: {
                type: String,
                required: true
            },
            medical: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        instagram: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
