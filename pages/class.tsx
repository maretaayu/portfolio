import React from "react";
import { Layout } from "../components";
import { LearnContainer } from "../components/Learn/LearnContainer";

export default function about() {
  return (
    <Layout pageTitle="Live Class with Mareta" withHeader={false}>
      <LearnContainer />
    </Layout>
  );
}
