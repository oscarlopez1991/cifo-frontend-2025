import { View } from "react-native";
import Comment from "./Comment";

export default function ListComments({ comments }) {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <View>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          username={comment.username}
          comment={comment.comment}
        />
      ))}
    </View>
  );
}
