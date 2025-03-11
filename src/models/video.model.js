import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    videoFile: {
        type: String, // Cloudinary URL
        required: true
    },
    thumbnail: {
        type: String, // Cloudinary URL
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    views :{
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }


    },
    {
        timestamps: true
    }
);

videoSchema.plugin(mongooseAggregatePaginate);



const Video = mongoose.model('Video', videoSchema);

export default Video;