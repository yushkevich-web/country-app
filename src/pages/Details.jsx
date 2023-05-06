import { useParams } from "react-router-dom";

export function Details() {

  let {name} = useParams();

  return (
    <div>
      Details about {name}
    </div>
  );
}