import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, StyleSheet } from 'react-native';

// Post and Comment Interfaces
interface Post {
  id: string;
  content: string;
  author: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

// Sample Initial Post Data
const initialPosts: Post[] = [
  {
    id: '1',
    content: 'Welcome to our mental health support platform!',
    author: 'Admin',
    comments: [
      {
        id: '1',
        text: 'This is a great initiative to support mental well-being.',
        author: 'User1',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '2',
    content: 'How do you deal with anxiety on a daily basis?',
    author: 'User2',
    comments: [
      {
        id: '1',
        text: 'I try meditation and deep breathing exercises.',
        author: 'User3',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '3',
    content: 'Any tips for improving sleep quality?',
    author: 'User4',
    comments: [
      {
        id: '1',
        text: 'Reducing screen time before bed helps me a lot.',
        author: 'User5',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '4',
    content: 'What do you do when you feel overwhelmed?',
    author: 'User6',
    comments: [
      {
        id: '1',
        text: 'Talking to friends and family helps me.',
        author: 'User7',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: '5',
    content: 'Grateful for this community. It has really helped me.',
    author: 'User8',
    comments: [
      {
        id: '1',
        text: 'Glad to hear that!',
        author: 'User9',
        timestamp: new Date(),
      },
    ],
  },
];

const CommunityScreen = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');

  // Add a New Post Function
  const addPost = (content: string) => {
    if (content.trim() === '') {
      Alert.alert('Error', 'Post content cannot be empty.');
      return;
    }
    const newPost: Post = {
      id: (posts.length + 1).toString(),
      content: content,
      author: 'CurrentUser', // Replace with actual user data
      comments: [],
    };
    setPosts([...posts, newPost]);
    setNewPost(''); // Clear input
  };

  // Add a Comment to a Post
  const addComment = (postId: string, commentText: string) => {
    if (commentText.trim() === '') {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: (post.comments.length + 1).toString(),
                text: commentText,
                author: 'CurrentUser', // Replace with actual user data
                timestamp: new Date(),
              },
            ],
          };
        }
        return post;
      })
    );
    setNewComment(''); // Clear comment input
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Project Description */}
        <Text style={styles.title}>Mental Health Support Community</Text>
        <Text style={styles.description}>
          Connect, share, and support each other on your mental health journey. Share your thoughts and experiences with the community.
        </Text>

        {/* New Post Input */}
        <TextInput
          value={newPost}
          onChangeText={setNewPost}
          placeholder="What's on your mind?"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={() => addPost(newPost)}>
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>

        {/* Posts List */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postAuthor}>{item.author}</Text>
              <Text style={styles.postContent}>{item.content}</Text>

              {/* Comments Section */}
              <FlatList
                data={item.comments}
                keyExtractor={(comment) => comment.id}
                renderItem={({ item: comment }) => (
                  <View style={styles.commentContainer}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                    <Text style={styles.commentTimestamp}>
                      {comment.timestamp.toLocaleString()}
                    </Text>
                  </View>
                )}
              />

              {/* Add Comment Input */}
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Add a comment..."
                placeholderTextColor="#ccc"
                style={styles.input}
              />
              <TouchableOpacity style={styles.button} onPress={() => addComment(item.id, newComment)}>
                <Text style={styles.buttonText}>Add Comment</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

// Styles using your background color
const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A0887', // Your primary color
    marginBottom: 10,
  },
  description: {
    marginBottom: 16,
    color: '#000', // Black text for readability
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A0887',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000', // Black text for input field
  },
  postContainer: {
    padding: 16,
    marginTop: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 5,
  },
  postContent: {
    color: '#000',
    marginBottom: 10,
  },
  commentContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A0887',
  },
  commentText: {
    color: '#000',
  },
  commentTimestamp: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#4A0887',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommunityScreen;
