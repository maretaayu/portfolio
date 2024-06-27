import { Layout } from "../components";

type Post = {
  id: number;
  title: string;
  body: string;
};

type BlogProps = {
  dataBlog: Array<Post>;
};

export default function Blog({ dataBlog }: BlogProps) {
  return (
    <Layout pageTitle="Blog">
      {dataBlog.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const dataBlog = await res.json();

  return {
    props: {
      dataBlog,
    },
  };
}
