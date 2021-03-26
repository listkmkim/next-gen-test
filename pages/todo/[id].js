import { useRouter } from "next/router";

function Todo({ todo }) {
  const { query } = useRouter();
  return <div> todo : {JSON.stringify(todo)}</div>;
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/todos/${query}`
  //   );
  //   const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = Array.from({ length: 10 })
    .fill(0)
    .map((_, id) => ({
      params: { id: String(id + 1) },
    }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.id}`
  );
  const todo = await res.json();

  // Pass post data to the page via props
  return { props: { todo } };
}

export default Todo;
