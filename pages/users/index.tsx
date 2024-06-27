import { Layout } from "../../components";
import { useRouter } from "next/router";

type UserProps = {
  dataUsers: Array<any>;
};

export default function Users({ dataUsers }: UserProps) {
  const router = useRouter();

  return (
    <Layout pageTitle="Users">
      {dataUsers.map((user) => (
        <div key={user.id} onClick={() => router.push(`/users/${user.id}`)}>
          <p>{user.name}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const dataUsers = await res.json();

  return {
    props: {
      dataUsers,
    },
  };
}
