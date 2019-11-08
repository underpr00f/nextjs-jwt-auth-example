import React, { useState } from "react";
import Layout from "../components/Layout";
import { useDescriptionMutation, useMeetQuery } from "../generated/graphql";

// Type whatever you expect in 'this.props.match.params.*'

export default () => {
  const { data, loading, error } = useMeetQuery({ fetchPolicy: "cache-and-network" });
  const desc = data && data.meet && data.meet.description || "";

  const [description, setDescription] = useState(desc);
  const [changed, setChanged] = useState(false);
  const [descSubmit, setDescSubmit] = useState("");
  const [descriptionMutate] = useDescriptionMutation();
 
  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Layout>
        <div>err</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div>no data</div>
      </Layout>
    );
  }
  if (!data.meet) {
    return (
      <Layout>
        <div>no data</div>
      </Layout>
    );
  }
  const email = data.meet.email; 

  return (

    <Layout>
      <div>Hello {data.meet.id+' '+email+' '} { changed ? descSubmit : data.meet.description }</div>

      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log("form submitted");
          const response = await descriptionMutate({
            variables: {
              email,
              description
            }

          });
          setChanged(true);
          setDescSubmit(description);
          console.log(response);

        }}
      >

        <div>
          <input
            value={description}
            placeholder="description"
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit">Description</button>
      </form>
    </Layout>
  );
};
