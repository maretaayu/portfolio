import { useRouter } from "next/router";
import { Layout } from "../../components";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

type UserDetailProps = {
  user: User;
};

type GetStaticProps = {
  params: {
    id: string;
  };
};

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <Layout pageTitle="User Detail">
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const paths = users.map((user: User) => ({
    params: { id: `${user.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps(context: GetStaticProps) {
  const { id } = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}
