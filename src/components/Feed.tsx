import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy, addDoc, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

interface Image {
  id: string;
  userId: string;
  imageUrl: string;
  likes: number;
  comments: string[];
}

const Feed = () => {
  const [images, setImages] = useState<Image[]>([]);
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const q = query(collection(db, "images"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const imagesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Image[];

      setImages(imagesList);
    };

    fetchImages();
  }, []);

  const handleLike = async (imageId: string, currentLikes: number) => {
    const imageRef = doc(db, "images", imageId);
    await updateDoc(imageRef, { likes: currentLikes + 1 });
  };

  const handleComment = async (imageId: string) => {
    const imageRef = doc(db, "images", imageId);
    await updateDoc(imageRef, {
      comments: [...images.find((img) => img.id === imageId)?.comments || [], newComment],
    });
    setNewComment(""); // Clear input after comment
  };

  return (
    <div className="feed">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <img src={image.imageUrl} alt="User Image" />
          <div className="info">
            <button onClick={() => handleLike(image.id, image.likes)}>Like ({image.likes})</button>
          </div>
          <div className="comments">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={() => handleComment(image.id)}>Comment</button>
            {image.comments?.map((comment, index) => (
              <div key={index} className="comment">{comment}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
