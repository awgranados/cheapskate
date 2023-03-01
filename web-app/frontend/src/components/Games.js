import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom";

function Games() {
  return (
    <section>
      <div className="container-fluid">
        <h1 className="mt-5">Games</h1>
        <p>Hello World</p>
      </div>
    </section>
  );
}

export default Games;
