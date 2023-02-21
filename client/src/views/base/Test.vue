<template>
    <div>
      <h2>title</h2>
      <p>content</p>
      <div>
        <h3>Comments</h3>
        <ul>
          <li>
            <strong>comment-author</strong>
            <p>commentcontent</p>
          </li>
        </ul>
        <form @submit.prevent="addComment">
          <div>
            <label for="author">Author:</label>
            <input id="author" type="text" v-model="newComment.author">
          </div>
          <div>
            <label for="content">Content:</label>
            <textarea id="content" v-model="newComment.content"></textarea>
          </div>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: Object,
    },
    data() {
      return {
        newComment: {
          author: "",
          content: "",
        },
      };
    },
    methods: {
      addComment() {
        const comment = {
          author: this.newComment.author,
          content: this.newComment.content,
        };
        this.post.comments.push(comment);
        this.newComment.author = "";
        this.newComment.content = "";
      },
    },
  };
  </script>
  